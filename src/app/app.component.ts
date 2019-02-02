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

  public qod : any;
  public nombre : string;
  
  constructor(
    private platform: Platform,
    private quoteProvider : QuoteProvider,
    private menuCtrl : MenuController,
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.quoteProvider.getQOD().subscribe(qod => {
      this.qod = qod.contents.quotes[0];

      this.platform.ready().then(() => {
        this.menuCtrl.open();      
      });
    });
    this.nombre = sessionStorage.getItem("nombre");
  }

 
}

