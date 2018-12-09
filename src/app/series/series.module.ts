import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import { IonicModule } from '@ionic/angular';

import { SeriesPage } from './series.page';
import { SerieProvider } from 'src/providers/SerieProvider';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';


const routes: Routes = [
  {
    path: '',
    component: SeriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    HttpClientModule,

    RouterModule.forChild(routes)
  ],
  declarations: [SeriesPage],
  providers: [SerieProvider ],
})
export class SeriesPageModule {}
