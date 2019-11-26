import { Component, NgZone } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { QuoteProvider } from 'src/providers/QuoteProvider';
import { Routes } from '@angular/router';
import { SeriesPage } from './series/series.page';
import { ComicPage } from './comics/comic/comic.page';
import { UserProvider } from 'src/providers/UserProvider';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';
import { AuthProvider } from 'src/providers/AuthProvider';


declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})



export class AppComponent {

  public appPages = [
    {
      title: 'Series',
      url: '/series',
      icon: 'albums'
    },
    {
      title: 'Comics',
      url: '/comics',
      icon: 'book'
    }
  ];

  public qod: any;
  public message: string;
  public isUserLoggedIn: boolean;

  private welcomeMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public welcomeMessageObs: Observable<string> = this.welcomeMessage.asObservable();



  constructor(
    private platform: Platform,
    private authProvider: AuthProvider,
    private quoteProvider: QuoteProvider,
    private menuCtrl: MenuController,
    private zone: NgZone,
  ) {
    window.onSignIn = this.onSignIn;
    // Refresh workarround
    this.welcomeMessageObs.subscribe(this.onWelcomeMessageChanged.bind(this));
    this.initializeApp();
  }

  initializeApp() {
    this.quoteProvider.getQOD().subscribe(qod => {
      this.qod = qod.contents.quotes[0];

      this.platform.ready().then(() => {
        this.menuCtrl.open();
      });
    });
  }
  onSignIn = (googleUser) => {

    const idToken = googleUser.getAuthResponse().id_token;
    if (typeof (Storage) !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.setItem("token", idToken);
    }


    this.authProvider.verifyToken(idToken).subscribe(response=>{
      console.log("Ha terminao y eso :)");
    })

    // const xhr = new XMLHttpRequest();



    // xhr.open('POST', 'http://localhost:8000/auth');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send('idtoken=' + idToken);

    this.welcomeMessage.next("Bienvenido, " + googleUser.getBasicProfile().getName());
  }

  // Workarround thanks to:
  // https://stackoverflow.com/questions/56612654/ionic-4-angular-ion-input-model-not-updating-after-service-subscription-re
  onWelcomeMessageChanged = (message: any): void => {
    this.zone.run(() => {
      this.currentWelcomeMessage = message;
    });
  };


  public get currentWelcomeMessage(): string {
    return this.message;
  }


  public set currentWelcomeMessage(message: string) {
    this.message = message;
  }



}


