import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProvider } from 'src/providers/UserProvider';
import { HttpModule } from '@angular/http';
import { UserGuard } from 'src/guards/UserGuard';
import { AdministratorGuard } from 'src/guards/AdministratorGuard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'series',
    pathMatch: 'full',
    canActivate: [AdministratorGuard, UserGuard] 
  },
  { 
    path: 'series',
    loadChildren: './series/series.module#SeriesPageModule',
    canActivate: [AdministratorGuard, UserGuard] 
  },
  {
    path: 'series/add', 
    loadChildren: './series/add-serie/add-serie.module#AddSeriePageModule'
    ,
    canActivate: [AdministratorGuard] 
  },
  { 
    path: 'series/:id', 
    loadChildren: './series/serie/serie.module#SeriePageModule' 
    ,
    canActivate: [AdministratorGuard,UserGuard]
  },
  {
    path: 'comics',
    loadChildren: './comics/comics.module#ComicsPageModule'
    ,
    canActivate: [ AdministratorGuard]
  },
  { path: 'comics/add', loadChildren: './comics/add-comic/add-comic.module#AddComicPageModule' },
  { path: 'comics/:id', loadChildren: './comics/comic/comic.module#ComicPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpModule],
  exports: [RouterModule],
  providers : [UserProvider, UserGuard,AdministratorGuard]
})
export class AppRoutingModule {}
