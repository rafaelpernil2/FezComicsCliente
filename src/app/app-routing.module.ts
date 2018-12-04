import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'series',
    pathMatch: 'full'
  },
  { 
    path: 'series',
    loadChildren: './series/series.module#SeriesPageModule'
  },
  {
    path: 'series/add', 
    loadChildren: './series/add-serie/add-serie.module#AddSeriePageModule' 
  },
  { 
    path: 'series/:id', 
    loadChildren: './series/serie/serie.module#SeriePageModule' 
  },
  {
    path: 'comics',
    loadChildren: './comics/comics.module#ComicsPageModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
