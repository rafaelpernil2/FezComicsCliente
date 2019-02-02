import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { QuoteProvider } from 'src/providers/QuoteProvider';
import { Routes } from '@angular/router';
import { SeriesPage } from './series/series.page';
import { ComicPage } from './comics/comic/comic.page';
import { UserProvider } from 'src/providers/UserProvider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  public appPages = [
    {
      title: 'Series',
      url: '/series',
      icon: 'archive'
    },
    {
      title: 'Comics',
      url: '/comics',
      icon: 'paper'
    }
  ];

<<<<<<< HEAD
  public qod : any;
  public nombre : string;
  
  constructor(
    private platform: Platform,
    private quoteProvider : QuoteProvider,
    private menuCtrl : MenuController,
=======
  public qod: any;
  private nombre: string;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private quoteProvider: QuoteProvider,
    private menuCtrl: MenuController,
>>>>>>> c3f8e910f7ea1fd11bc4c8ec6782576fe0b9ee12
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.quoteProvider.getQOD().subscribe(qod => {
      this.qod = qod.contents.quotes[0];

      this.platform.ready().then(() => {
<<<<<<< HEAD
        this.menuCtrl.open();      
=======
        this.statusBar.styleDefault();
        this.nombre = sessionStorage.getItem("nombre");
        this.menuCtrl.open();
>>>>>>> c3f8e910f7ea1fd11bc4c8ec6782576fe0b9ee12
      });
    });
   
  }
 
}


