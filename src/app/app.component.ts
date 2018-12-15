import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private quoteProvider : QuoteProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.quoteProvider.getQOD().subscribe(qod => {
      this.qod = qod.contents.quotes[0];

      this.platform.ready().then(() => {
        this.statusBar.styleDefault();      
      });
    });
  }
}

