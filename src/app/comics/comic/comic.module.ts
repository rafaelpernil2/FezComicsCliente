import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComicPage } from './comic.page';
import { HttpModule } from '@angular/http';
import { ComicProvider } from 'src/providers/ComicProvider';
import { FileUploadModule } from 'ng2-file-upload';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
import { SerieProvider } from 'src/providers/SerieProvider';
import { LikeProvider } from 'src/providers/LikeProvider';
import { ComentarioProvider } from 'src/providers/ComentarioProvider';
import { UserProvider } from 'src/providers/UserProvider';
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
  providers: [
    ComicProvider,
    ComicHasSerieProvider,
    SerieProvider,
    LikeProvider,
    ComentarioProvider,
    UserProvider
  ]
})
export class ComicPageModule {}
