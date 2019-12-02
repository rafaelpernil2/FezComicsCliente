import { Component, NgZone } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { QuoteProvider } from 'src/providers/QuoteProvider';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthProvider } from 'src/providers/AuthProvider';
import { DataUtil } from 'src/utils/DataUtil';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';


declare const window: any;
declare const gapi: any;

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

  private welcomeMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public welcomeMessageObs: Observable<string> = this.welcomeMessage.asObservable();
  public pic: SafeUrl;


  constructor(
    private platform: Platform,
    private authProvider: AuthProvider,
    private quoteProvider: QuoteProvider,
    private menuCtrl: MenuController,
    private zone: NgZone,
    private sanitizer: DomSanitizer
  ) {
    // Attach signIn method to window
    window.onSignIn = this.onSignIn;
    window.signOut = this.signOut;
    // Refresh workarround
    this.pic = DataUtil.getImgContent(this.sanitizer);
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
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.removeItem('token');
      DataUtil.setCookie('token', idToken, 1);
    }
    this.authProvider.authenticate(idToken).toPromise().then(() => {
      this.welcomeMessage.next('Bienvenido, ' + googleUser.getBasicProfile().getName());
    });


  }

  signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    DataUtil.eraseCookie('token');
    auth2.signOut();
    auth2.disconnect();
    this.welcomeMessage.next('');
  }

  // Workarround thanks to:
  // https://stackoverflow.com/questions/56612654/ionic-4-angular-ion-input-model-not-updating-after-service-subscription-re
  onWelcomeMessageChanged = (message: any): void => {
    this.zone.run(() => {
      this.currentWelcomeMessage = message;
    });
  }


  public get currentWelcomeMessage(): string {
    return this.message;
  }


  public set currentWelcomeMessage(message: string) {
    this.message = message;
  }



}


