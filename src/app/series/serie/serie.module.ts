import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeriePage } from './serie.page';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';

const routes: Routes = [
  {
    path: '',
    component: SeriePage
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
  declarations: [SeriePage],
  providers: [SerieProvider, ComicHasSerieProvider ],
})
export class SeriePageModule {}
