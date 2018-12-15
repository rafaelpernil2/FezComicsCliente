import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComicPage } from './comic.page';
import { HttpModule } from '@angular/http';
import { ComicProvider } from 'src/providers/ComicProvider';
import { FileUploader, FileItem, FileUploadModule } from 'ng2-file-upload';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
const routes: Routes = [
  {
    path: '',
    component: ComicPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComicPage],
  providers: [ComicProvider, ComicHasSerieProvider]
})
export class ComicPageModule {}
