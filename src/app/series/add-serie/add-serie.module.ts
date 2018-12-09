import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddSeriePage } from './add-serie.page';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SerieProvider } from 'src/providers/SerieProvider';

const routes: Routes = [
  {
    path: '',
    component: AddSeriePage
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
  declarations: [AddSeriePage],
  providers: [SerieProvider ],
})
export class AddSeriePageModule {}
