import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProvider } from 'src/providers/UserProvider';
import { HttpModule } from '@angular/http';

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
  { path: 'comics/add', loadChildren: './comics/add-comic/add-comic.module#AddComicPageModule' },
  { path: 'comics/:id', loadChildren: './comics/comic/comic.module#ComicPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpModule],
  exports: [RouterModule],
  providers : [UserProvider]
})
export class AppRoutingModule {}
