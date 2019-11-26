import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ToastController } from '@ionic/angular';
import { Serie } from 'src/models/Serie';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
import { Comic } from 'src/models/Comic';
import { ComicProvider } from 'src/providers/ComicProvider';
import { AppSettings } from 'src/config/AppSettings';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  serie: Serie;
  comics: Comic[];
  appSettingsObject: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serieProvider: SerieProvider,
    private comicProvider: ComicProvider,
    private comicHasSerieProvider: ComicHasSerieProvider,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    private appSettings: AppSettings
  ) {
    this.appSettingsObject = appSettings.json.default;
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!isNaN(id)) { this.serieProvider.get(id).subscribe(serie => this.serie = serie); }
    this.comicHasSerieProvider.getComicsBySerie(id).subscribe(comics => {
      this.comics = comics;
    });

  }

  onSubmit() {
    this.serieProvider.put(this.serie.id, this.serie).subscribe(serie => {
      this.toastCtrl.create({
        message: 'Se ha modificado la serie correctamente',
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
      this.router.navigate(['/series']);
    }, error => {
      this.toastCtrl.create({
        message: 'Se ha producido un error. Inténtalo más tarde',
        duration: 3000,
        position: 'bottom'
      }).then(toast => toast.present());
    });
  }

  onClickDelete() {
    this.comicHasSerieProvider.getComicsBySerie(this.serie.id).subscribe(result => {
      result.forEach(element => {
        this.comicProvider.delete(element.id).subscribe(result => {
          this.comicHasSerieProvider.delete(element.id, this.serie.id).subscribe();
          const toast = this.toastCtrl.create({
            message: 'Se ha borrado el comic' + element.nombre,
            duration: 3000,
            position: 'bottom'
          }).then(toast => toast.present());
          this.router.navigate(['/series']);

        }, error => {
          this.toastCtrl.create({
            message: 'Se ha producido un error. Inténtalo más tarde',
            duration: 3000,
            position: 'bottom'
          }).then(toast => toast.present());
        });
      });
      this.serieProvider.delete(this.serie.id).subscribe(result => {
        const toast = this.toastCtrl.create({
          message: 'Se ha borrado la serie correctamente',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
        this.router.navigate(['/series']);
      }, error => {
        this.toastCtrl.create({
          message: 'Se ha producido un error. Inténtalo más tarde',
          duration: 3000,
          position: 'bottom'
        }).then(toast => toast.present());
      });

    });

  }
  getFoto(comic: Comic) {
    return 'data:image/jpeg;base64, ' + comic.foto;

  }
  getImgContent(comic: Comic): SafeUrl {
    let result;

    if (comic.foto == null) {
      result = this.appSettingsObject.DefaultLogo;
    } else {
      result = 'data:image/jpeg;base64, ' + comic.foto;

    }
    return this.sanitizer.bypassSecurityTrustUrl(result);
  }

  onClickComic(comic: Comic) {
    this.router.navigate([`comics/${comic.id}`]);
  }
}
