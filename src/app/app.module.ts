import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { UserProvider } from 'src/providers/UserProvider';
import { HttpModule } from '@angular/http';
import { AdministratorGuard } from 'src/guards/AdministratorGuard';
import { UserGuard } from 'src/guards/UserGuard';
import { QuoteProvider } from 'src/providers/QuoteProvider';
import { GoogleBooksProvider } from 'src/providers/GoogleBooksProvider';
import { AppSettings } from 'src/config/AppSettings';

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
    AppSettings,
    UserProvider,
    QuoteProvider,
    GoogleBooksProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule {}
