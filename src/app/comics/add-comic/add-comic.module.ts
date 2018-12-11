import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddComicPage } from './add-comic.page';
import { HttpModule } from '@angular/http';
import { ComicProvider } from 'src/providers/ComicProvider';

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
  providers: [ComicProvider]
})
export class AddComicPageModule {}
