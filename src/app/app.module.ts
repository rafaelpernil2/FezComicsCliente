import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { UserProvider } from 'src/providers/UserProvider';
import { HttpModule } from '@angular/http';
<<<<<<< HEAD
import { AdministratorGuard } from 'src/guards/AdministratorGuard';
import { UserGuard } from 'src/guards/UserGuard';
=======
>>>>>>> 42c19cf7f69e9f5cae473b6fcb4a19e4644e7bec
import { QuoteProvider } from 'src/providers/QuoteProvider';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
=======
    UserProvider,
>>>>>>> 42c19cf7f69e9f5cae473b6fcb4a19e4644e7bec
    QuoteProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule {}
