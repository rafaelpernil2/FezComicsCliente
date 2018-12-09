import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ComicsPage } from './comics.page';
import { ComicProvider } from 'src/providers/ComicProvider';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    component: ComicsPage
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
  declarations: [ComicsPage],
  providers: [ComicProvider]
})
export class ComicsPageModule {}
