import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComicProvider } from 'src/providers/ComicProvider';
import { ToastController } from '@ionic/angular';
import { Comic } from 'src/models/Comic';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { blobToBase64String } from 'blob-util';
import { ComicHasSerie } from 'src/models/ComicHasSerie';
import { Serie } from 'src/models/Serie';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
import { DataUtil } from 'src/utils/DataUtil';


const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.page.html',
  styleUrls: ['./add-comic.page.scss'],
})

export class AddComicPage implements OnInit {
  comic: Comic;
  comicHasSerie: ComicHasSerie;
  seriesSeleccionadas: Serie[];
  series: Serie[];
  allSeries: Serie[];
  uploader: FileUploader = new FileUploader({ url: '' });
  isFile = false;
  pic: any;
  inputFile: any;
  idSerie: number;
  anotacionPublica: string;




  constructor(
    private router: Router,
    private comicProvider: ComicProvider,
    private serieProvider: SerieProvider,
    private toastCtrl: ToastController,
    private comicHasSerieProvider: ComicHasSerieProvider,
    private sanitizer: DomSanitizer

  ) {
    this.comic = new Comic();


  }

  ngOnInit() {
    this.serieProvider.all().subscribe(series => {
      this.allSeries = series;
      this.series = series;
    });
    this.uploaderController();
    this.pic = DataUtil.getImgContent(this.sanitizer);
  }

  onSubmit() {
    this.isFile ? this.uploader.uploadAll() : this.uploadComic();
  }

  selectedItem() {
    // this.seriesSeleccionadas;
  }
  uploaderController() {
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.isFile = true;
      if (!fileItem.file.type.includes('image')) {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
        this.uploader.cancelItem(fileItem);
        this.uploader.cancelAll();
        this.isFile = false;
      } else {
        blobToBase64String(fileItem._file).then(result => {
          this.pic = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, ' + result);
          this.isFile = true;
        }).catch(err => {
          this.toastCtrl.create({
            message: 'Se ha producido un error. Inténtalo más tarde',
            duration: 3000,
            position: 'bottom'
          }).then(toast => toast.present());
        });
      }
    };

    this.uploader.onCompleteItem = (item, response) => {
      blobToBase64String(item._file).then(result => {
        this.comic.foto = result;
        this.uploadComic();
      }).catch(err => {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      });
    };
  }

  uploadComic() {
    if (this.seriesSeleccionadas.length > 0) {
      this.comicProvider.post(this.comic).subscribe(comicPost => {
        this.comic = comicPost;
        this.seriesSeleccionadas.forEach(element => {
          this.comicHasSerie = new ComicHasSerie(element.id, this.comic.id, this.anotacionPublica);
          this.comicHasSerieProvider.post(this.comicHasSerie).subscribe(
            comicHasSerie => {
              this.toastCtrl.create({
                message: 'Se ha creado el comic correctamente',
                duration: 3000,
                position: 'bottom'
              }).then(toast => toast.present());
              this.router.navigate(['/comics']);
            }, error => {
              this.toastCtrl.create({
                message: 'Se ha producido un error. Inténtalo más tarde',
                duration: 3000,
                position: 'bottom'
              }).then(toast => toast.present());
            });
        });
      }, err => {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      });
    } else {
      this.toastCtrl.create({
        message: 'Error: No se ha seleccionado ninguna serie',
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
      this.router.navigate(['/comics']);
    }

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
      }).then(toast => toast.present());
    });
  }



}
