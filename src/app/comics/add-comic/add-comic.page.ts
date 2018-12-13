import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicProvider } from 'src/providers/ComicProvider';
import { ToastController } from '@ionic/angular';
import { Comic } from 'src/models/Comic';
import { Serie } from 'src/models/Serie';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
import { ComicHasSerie } from 'src/models/ComicHasSerie';


const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.page.html',
  styleUrls: ['./add-comic.page.scss'],
})

export class AddComicPage implements OnInit {
  comic: Comic;
  comicHasSerie: ComicHasSerie;
  serie: Serie;
  series: Serie[];
  allSeries: Serie[];


  constructor(
    private router: Router,
    private comicProvider: ComicProvider,
    private serieProvider: SerieProvider,
    private toastCtrl: ToastController,
    private comicHasSerieProvider: ComicHasSerieProvider


  ) {
    this.comic = new Comic();
  }

  ngOnInit() {
    this.serieProvider.all().subscribe(series => {
      this.allSeries = series;
      this.series = series;
    });
    
  }

  onSubmit() {






    this.comicProvider.post(this.comic).subscribe(comic => {
      //this.comicHasSerie.comic = this.comic;
    });
    this.serieProvider.post(this.serie).subscribe(serie => {
      //this.comicHasSerie.serie = this.serie;
    })
   
   
   /* this.comicHasSerieProvider.post(this.comicHasSerie).subscribe(comicHasSerie => {
      this.toastCtrl.create({
        message: "Se ha creado el comic correctamente",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
      this.router.navigate(['/comics']);
    }, error => {
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    })
    */
  }

  encodeImageFileAsURL(element) {
    console.log("PROMELOSIS", element.target);
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log('RESULT', reader.result)
      var resultado = JSON.stringify(reader.result);
      resultado.replace(/^data:image\/[a-z]+;base64,/, "");
      console.log(resultado)
    }
    reader.readAsDataURL(file);





  }



}
