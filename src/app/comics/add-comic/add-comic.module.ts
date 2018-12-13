import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddComicPage } from './add-comic.page';
import { HttpModule } from '@angular/http';
import { ComicProvider } from 'src/providers/ComicProvider';
import { SerieProvider } from 'src/providers/SerieProvider';
import { Serie } from 'src/models/Serie';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';

const routes: Routes = [
  {
    path: '',
    component: AddComicPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddComicPage],
  providers: [ComicProvider,SerieProvider,ComicHasSerieProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AddComicPageModule {}
