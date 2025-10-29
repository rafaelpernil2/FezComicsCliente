import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComicProvider } from 'src/providers/ComicProvider';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { Comic } from 'src/models/Comic';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { blobToBase64String } from 'blob-util';
import { Serie } from 'src/models/Serie';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
import { ComicHasSerie } from 'src/models/ComicHasSerie';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ComicHasSeriePK } from 'src/models/ComicHasSeriePK';
import { LikeProvider } from 'src/providers/LikeProvider';
import { ComentarioProvider } from 'src/providers/ComentarioProvider';
import { UserProvider } from 'src/providers/UserProvider';
import { Like } from 'src/models/Like';
import { User } from 'src/models/User';
import { Comentario } from 'src/models/Comentario';
import { GoogleBooksProvider } from 'src/providers/GoogleBooksProvider';
import { DataUtil } from 'src/utils/DataUtil';


@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {

  comic: Comic;
  pic: any;
  uploader: FileUploader = new FileUploader({});
  isFile = false;
  seriesSeleccionadas: Serie[];
  seriesDeComic: Serie[];
  series: Serie[];
  inputFile: any;
  anotacionPublica: string;
  liked = false;
  user: User;
  numLikes: number;
  comentario: Comentario;
  comentarios: Comentario[];
  userNames: {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comicProvider: ComicProvider,
    private comicHasSerieProvider: ComicHasSerieProvider,
    private serieProvider: SerieProvider,
    private likeProvider: LikeProvider,
    private comentarioProvider: ComentarioProvider,
    private userProvider: UserProvider,
    private googleBooksProvider: GoogleBooksProvider,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
  ) {
    this.comentario = new Comentario();
    this.userNames = {};
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (!isNaN(id)) {
      this.comicProvider.get(id).subscribe(comic => {
        this.comic = comic;

        this.pic = DataUtil.getImgContent(this.sanitizer, comic);

        this.userProvider.getUserByToken(DataUtil.getCookie('token')).subscribe(user => {

          this.user = user;
          this.likeProvider.getByUserAndComic(this.user.id, this.comic.id).subscribe(like => this.liked = true);
        });

        this.serieProvider.all().subscribe(result => {
          this.series = result;

        });

        this.comicHasSerieProvider.getSerieByComic(this.comic.id).subscribe(series => {
          this.seriesSeleccionadas = series;
        });
        this.comicHasSerieProvider.getSerieByComic(this.comic.id).subscribe(series => {
          this.seriesDeComic = series;
        });

        this.comentarioProvider.getComentariosByComic(this.comic.id).subscribe(comentarios => {
          this.comentarios = comentarios;
          this.comentarios.forEach(comentario => {
            this.userProvider.get(comentario.user).subscribe(user => {
              this.userNames[comentario.user] = user.nombre;
            });
          });
        });

        this.likeProvider.count(this.comic.id).subscribe(result => {
          this.numLikes = result;
        });



      });



    }

    this.uploaderController();
  }
  onSubmit() {
    this.isFile ? this.uploader.uploadAll() : this.uploadComic();
  }

  onClickSerie(serie) {
    this.router.navigate([`series/${serie.id}`]);
  }

  selectedItem() {
    // this.seriesSeleccionadas;
  }

  getUsuario(id) {
    this.userProvider.get(id).subscribe(result => {
      return result.nombre;
    });
  }

  uploaderController() {
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.isFile = true;
      if (!fileItem.file.type.includes('image')) {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(errorToast => errorToast.present());
        this.uploader.cancelItem(fileItem);
        this.uploader.cancelAll();
        this.isFile = false;
      } else {
        blobToBase64String(fileItem._file.slice()).then(result => {
          this.pic = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, ' + result);
          this.isFile = true;
        }).catch(err => {
          this.toastCtrl.create({
            message: 'Se ha producido un error. Inténtalo más tarde',
            duration: 3000,
            position: 'bottom'
          }).then(errorToast => errorToast.present());
        });
      }
    };

    this.uploader.onCompleteItem = (item, response) => {
      blobToBase64String(item._file.slice()).then(result => {
        this.comic.foto = result;
        this.uploadComic();
      }).catch(err => {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(errorToast => errorToast.present());
      });
    };
  }

  uploadComic() {
    this.comicProvider.put(this.comic.id, this.comic).subscribe(comic => {

      const diff = this.seriesDeComic;
      let itemsProcessed = 0;
      if (diff.length === 0) {
        this.seriesSeleccionadas.forEach(element => {
          this.comicHasSerieProvider.put(new ComicHasSerie(element.id, this.comic.id, '')).subscribe(result => {

            this.toastCtrl.create({
              message: 'Se ha modificado el comic correctamente',
              duration: 3000,
              position: 'bottom'
            }).then(toast => toast.present());
            this.router.navigate(['/comics']);
          });
        });
      } else {
        diff.forEach(element => {
          this.comicHasSerieProvider.delete(this.comic.id, element.id).subscribe(() => {
            itemsProcessed++;
            if (itemsProcessed === diff.length) {
              this.seriesSeleccionadas.forEach(serie => {
                this.comicHasSerieProvider.put(new ComicHasSerie(serie.id, this.comic.id, '')).subscribe(result => {

                  this.toastCtrl.create({
                    message: 'Se ha modificado el comic correctamente',
                    duration: 3000,
                    position: 'bottom'
                  }).then(toast => toast.present());
                  this.router.navigate(['/comics']);
                });
              });
            }

          });

        });
      }
    }, error => {
      this.toastCtrl.create({
        message: 'Se ha producido un error. Inténtalo más tarde',
        duration: 3000,
        position: 'bottom'
      }).then(errorToast => errorToast.present());
    });
  }

  onClickDelete() {


    this.comicProvider.delete(this.comic.id).subscribe(result => {
      this.toastCtrl.create({
        message: 'Se ha borrado el comic correctamente',
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
      this.router.navigate(['/comics']);
    }, error => {
      this.toastCtrl.create({
        message: 'Se ha producido un error. Inténtalo más tarde',
        duration: 3000,
        position: 'bottom'
      }).then(errorToast => errorToast.present());
    });
  }

  onClickLike() {
    if (this.liked === false) {
      this.liked = true;
      const like = new Like();
      like.user = this.user.id;
      like.comic = this.comic.id;
      this.likeProvider.post(like).toPromise()
        .then(() => {
          this.liked = true;
          this.numLikes++;
          this.toastCtrl.create({
            message: 'Te gusta este cómic',
            duration: 3000,
            position: 'bottom'
          }).then(toast => toast.present());
        }).catch(() => {
          this.toastCtrl.create({
            message: 'Se ha producido un error. Inténtalo más tarde',
            duration: 3000,
            position: 'bottom'
          }).then(errorToast => errorToast.present());
        });
    } else {
      this.likeProvider.deleteByUserAndComic(this.user.id, this.comic.id).subscribe(result => {
        this.liked = false;
        this.numLikes--;
        this.toastCtrl.create({
          message: 'Ya no te gusta este cómic',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      }, error => {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(errorToast => errorToast.present());
      });


    }
  }


  eliminaComentario(comentario) {
    this.comentarioProvider.delete(comentario.id).subscribe(
      () => {
        this.comentarios.splice(this.comentarios.findIndex(com => com === comentario), 1);
      }
    );

  }

  onAddComentario() {



    this.comentario.comic = this.comic.id;
    this.comentario.user = this.user.id;
    if (this.comentario.titulo !== '' && this.comentario.mensaje !== '') {
      this.userProvider.get(this.comentario.user).subscribe(user => {
        this.comentarioProvider.post(this.comentario).subscribe(comentario => {

          this.userNames[comentario.user] = user.nombre;
          this.comentarios.push(comentario);
        });

        this.comentario = new Comentario();
        this.toastCtrl.create({
          message: 'Se ha añadido el comentario correctamente',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      }, error => {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      });
    } else {
      this.toastCtrl.create({
        message: 'ERROR: Introduce título y mensaje',
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
    }

  }


  onClickGoogleBooks(comic: Comic) {
    this.googleBooksProvider.getBookByISBN(comic.isbn).subscribe(result => {
      if (result.totalItems > 0) {
        this.presentAlert(result.items[0].accessInfo);
      } else {
        this.toastCtrl.create({
          message: 'No se ha encontrado un libro con ese ISBN',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      }
    });
  }

  async presentAlert(result: any) {
    const alertMessage = '<strong>PDF</strong> -> ' +
      (result.pdf.isAvailable ? 'Sí' : 'No') +
      '<br><br><strong>EPUB</strong> -> ' +
      (result.epub.isAvailable ? 'Sí' : 'No');

    const alert = await this.alertController.create({
      header: 'Disponilidad',
      message: alertMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
}
