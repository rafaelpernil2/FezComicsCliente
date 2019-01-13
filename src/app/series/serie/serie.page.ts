import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SerieProvider } from 'src/providers/SerieProvider';
import { ToastController } from '@ionic/angular';
import { Serie } from 'src/models/Serie';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ComicHasSerieProvider } from 'src/providers/ComicHasSerieProvider';
import { Comic } from 'src/models/Comic';
import { ComicProvider } from 'src/providers/ComicProvider';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  serie : Serie;
  comics : Comic [];
  

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private serieProvider : SerieProvider,
    private comicProvider : ComicProvider,
    private comicHasSerieProvider : ComicHasSerieProvider,
    private toastCtrl : ToastController,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(!isNaN(id)) this.serieProvider.get(id).subscribe(serie => this.serie = serie);
    this.comicHasSerieProvider.getComicsBySerie(id).subscribe(comics => {
      this.comics = comics;
    })
   
  }

  onSubmit() {
    this.serieProvider.put(this.serie.id, this.serie).subscribe(serie => {
      this.toastCtrl.create({
        message: "Se ha modificado la serie correctamente",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
      this.router.navigate(['/series']);
    }, error => {
      this.toastCtrl.create({
        message: "Se ha producido un error. Inténtalo más tarde",
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    });
  }

  onClickDelete() {
    this.comicHasSerieProvider.getComicsBySerie(this.serie.id).subscribe(result => {
      result.forEach(element => {
        this.comicProvider.delete(element.id).subscribe(result=>{
          let toast = this.toastCtrl.create({
            message: "Se ha borrado el comic" + element.nombre,
            duration: 3000,
            position: 'top'
          }).then(toast => toast.present());
          this.router.navigate(['/series']);

        }, error =>{
          this.toastCtrl.create({
            message: "Se ha producido un error. Inténtalo más tarde",
            duration: 3000,
            position: 'top'
          }).then(toast => toast.present());
        });
      });
      this.serieProvider.delete(this.serie.id).subscribe(result => {
        let toast = this.toastCtrl.create({
          message: "Se ha borrado la serie correctamente",
          duration: 3000,
          position: 'top'
        }).then(toast => toast.present());
        this.router.navigate(['/series']);
      }, error => {
        this.toastCtrl.create({
          message: "Se ha producido un error. Inténtalo más tarde",
          duration: 3000,
          position: 'top'
        }).then(toast => toast.present());
      });

    });
    
  }
  getFoto(comic : Comic){
    return "data:image/jpeg;base64, " +comic.foto;
    
   }
   getImgContent(comic : Comic): SafeUrl {
     var result;
    
     if (comic.foto==null) {
       result = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojMzAzQzQyOyIgZD0iTTUwNy4zNzksMzQ3LjQxN2MtMS40NzgtMS4wMi0zNC4zNzktMjQuOTIxLTM3LjQ1MS03NC42MTFjNi4xNTctNS40MjEsMTAuMDc0LTE1LjMwOSwxMC4wNzQtMjcuNDgzICBjMC0xMi41MjctNC4xNTctMjIuNjEyLTEwLjYyNi0yNy45MTV2LTE0Ljc1MWMwLTI1LjY0Ni05Ljk4LTQ5Ljc1LTI4LjEyOC02Ny44NzVjLTE2LjE4NC0xNi4xOTEtMzcuMjMtMjUuNDM0LTU5Ljc3NC0yNy4zMjQgIEMzNjcuMDAxLDc3LjcxNywyODcuNzM0LDY0LDIxMy4zNTMsNjRDMTMyLjg5Nyw2NCw0Ni42OCw4MC4wMzQsNDMuMDE3LDExNS4wNmMtMC4wNDIsMC4xODgtMC4xNjgsMC4zMzEtMC4yMDEsMC41MjNMMCwzNzMuMzMzICBDMCw0MjEuODMzLDEwOS45MjcsNDQ4LDIxMy4zNTMsNDQ4czIxMy4zNTMtMjYuMTY3LDIxMy4yMDctNzYuNDE3bC00MC4zOTMtMjQyLjMzNmMxNS4wNjEsMi41OSwyOC45NjIsOS41ODMsMzkuOTk3LDIwLjYxNyAgYzE0LjEwNSwxNC4xMDQsMjEuODc3LDMyLjg0NCwyMS44NzcsNTIuNzkydjE0LjY4NmMtNi41MTYsNS4yODUtMTAuNzA5LDE1LjQwMS0xMC43MDksMjcuOThjMCwxMC42MzQsMy4wMiwxOS40ODYsNy44NzEsMjUuMTk1ICBjLTkuNDk2LDIxLjcwNi0zMC4wNjQsNzYuMzM3LTkuOTMzLDEwMy43NTNjMS4yNSwxLjY5OCwyLjk3OSwyLjk5LDQuOTU5LDMuNzA4bDE0LjcxLDUuMzY1YzEuMTY3LDAuNDM4LDIuNDE3LDAuNjQ2LDMuNjQ2LDAuNjQ2ICBjMS44NzUsMCwzLjc1LTAuNSw1LjM5Ni0xLjQ2OWwxMi41NDMtNy4zNTRsMTYuMDY0LDQuMDUyYzQuODU1LDEuMjE5LDEwLjAwMS0xLjE1NiwxMi4yMDktNS42ODhsNi4xNDYtMTIuNjY3ICBDNTEzLjIzNCwzNTYuMTM1LDUxMS42OTIsMzUwLjQwNiw1MDcuMzc5LDM0Ny40MTd6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNEMzJGMkY7IiBkPSJNMjEzLjMzMyw4NS4zMzNjNzAuMSwwLDExNS41NDgsMTEuMzMzLDEzNi4yMjQsMjEuMzMybC0xMTguMTY4LTAuMDA4ICBjLTMuNzIxLTYuMjU4LTEwLjI1Ny0xMC42NjgtMTguMDU2LTEwLjY2OGMtMTEuNzcxLDAtMjEuMzMzLDkuNTczLTIxLjMzMywyMS4zMzNzOS41NjMsMjEuMzMzLDIxLjMzMywyMS4zMzMgIGM3Ljc5OCwwLDE0LjMzMy00LjQwOSwxOC4wNTUtMTAuNjY1bDExOC4xNzYsMC4wMDhjLTIwLjY3MiwxMC02Ni4xMjQsMjEuMzM1LTEzNi4yMywyMS4zMzVjLTk4LjUyMSwwLTE0OS4zMzMtMjIuNDI3LTE0OS4zMzMtMzIgIFMxMTQuODEzLDg1LjMzMywyMTMuMzMzLDg1LjMzM3oiLz4KPHBhdGggc3R5bGU9Im9wYWNpdHk6MC4yO2ZpbGw6I0ZGRkZGRjtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgOyIgZD0iTTg1LjMzMywxMjcuOTljMC04LjcxNyw0Mi41OTktMjcuOTA1LDEyNC41MzQtMzEuMjk4ICBjMS4xNzMtMC4yMDEsMi4yMzctMC43MDIsMy40NjYtMC43MDJjMS4yNDYsMCwyLjM5NSwwLjI4OCwzLjU3LDAuNTAzYzUuOTExLTAuMTc0LDExLjQ2LTAuNTAzLDE3Ljc2My0wLjUwMyAgYzQ0Ljk5OSwwLDc5LjcwMyw0LjY4NSwxMDQuMzU0LDEwLjY3NGwxMC41MzYsMC4wMDFjLTIwLjY3Ni05Ljk5OS02Ni4xMjQtMjEuMzMyLTEzNi4yMjQtMjEuMzMyICBjLTk4LjUyMSwwLTE0OS4zMzMsMjIuNDI3LTE0OS4zMzMsMzJjMCwzLjgzMiw4LjUxNiw5LjcwNiwyNC41OTgsMTUuMzk1Qzg2LjU5NiwxMzAuOTcxLDg1LjMzMywxMjkuMzM2LDg1LjMzMywxMjcuOTl6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNEMzJGMkY7IiBkPSJNMjEzLjMzMyw0MjYuNjY3Yy0xMTguOTU4LDAtMTkyLTMxLjA2My0xOTIuMTQ2LTUxLjU4M2wzOC43NzEtMjMyLjYyOCAgYzI5LjY4OSwxOS4yMDcsOTMuMTM3LDI4LjIxMSwxNTMuMzc1LDI4LjIxMWM2MC4yNDYsMCwxMjMuNzAzLTkuMDA4LDE1My4zODctMjguMjE5bDM4LjYxMywyMzAuODg1ICBDNDA1LjMzMywzOTUuNjA0LDMzMi4yOTIsNDI2LjY2NywyMTMuMzMzLDQyNi42Njd6Ii8+CjxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMjtmaWxsOiNGRkZGRkY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDsiIGQ9Ik01My4xODgsMzk1LjQ2MWwyNy41NzQtMjQzLjIxICBjLTcuODkzLTIuOTM2LTE1LjEyMi02LjEyMS0yMC44MDMtOS43OTZMMjEuMTg4LDM3NS4wODNjMC4wNTksOC4xODYsMTEuODkxLDE4LjAzNCwzMy40NCwyNi45MzUgIEM1My43ODQsMzk5Ljc3LDUzLjE5OCwzOTcuNTYsNTMuMTg4LDM5NS40NjF6Ii8+CjxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgOyIgZD0iTTM2Ni43MiwxNDIuNDQ4Yy01LjY4MiwzLjY3Ny0xMi45MTQsNi44NjUtMjAuODEzLDkuODAybDI3LjQyNiwyNDEuMDY2ICBjMCwyLjc3LTAuNzg4LDUuNjY3LTIuMDE4LDguNjA3YzIxLjk2Ni05LjIyNSwzNC4wMTgtMTkuNjExLDM0LjAxOC0yOC41OUwzNjYuNzIsMTQyLjQ0OHoiLz4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItNDYuMDA2MSIgeTE9IjYzNy4yNzQ3IiB4Mj0iLTIzLjUyNDQiIHkyPSI2MjYuNzkxNCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgyMS4zMzMzIDAgMCAtMjEuMzMzMyA5OTguNDk4OCAxMzc2My4wNzkxKSI+Cgk8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAuMiIvPgoJPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfMV8pOyIgZD0iTTUwNy4zNzksMzQ3LjQxN2MtMS40NzgtMS4wMi0zNC4zNzktMjQuOTIxLTM3LjQ1MS03NC42MTEgIGM2LjE1Ny01LjQyMSwxMC4wNzQtMTUuMzA5LDEwLjA3NC0yNy40ODNjMC0xMi41MjctNC4xNTctMjIuNjEyLTEwLjYyNi0yNy45MTV2LTE0Ljc1MWMwLTI1LjY0Ni05Ljk4LTQ5Ljc1LTI4LjEyOC02Ny44NzUgIGMtMTYuMTg0LTE2LjE5MS0zNy4yMy0yNS40MzQtNTkuNzc0LTI3LjMyNEMzNjcuMDAxLDc3LjcxNywyODcuNzM0LDY0LDIxMy4zNTMsNjRDMTMyLjg5Nyw2NCw0Ni42OCw4MC4wMzQsNDMuMDE3LDExNS4wNiAgYy0wLjA0MiwwLjE4OC0wLjE2OCwwLjMzMS0wLjIwMSwwLjUyM0wwLDM3My4zMzNDMCw0MjEuODMzLDEwOS45MjcsNDQ4LDIxMy4zNTMsNDQ4czIxMy4zNTMtMjYuMTY3LDIxMy4yMDctNzYuNDE3bC00MC4zOTMtMjQyLjMzNiAgYzE1LjA2MSwyLjU5LDI4Ljk2Miw5LjU4MywzOS45OTcsMjAuNjE3YzE0LjEwNSwxNC4xMDQsMjEuODc3LDMyLjg0NCwyMS44NzcsNTIuNzkydjE0LjY4NiAgYy02LjUxNiw1LjI4NS0xMC43MDksMTUuNDAxLTEwLjcwOSwyNy45OGMwLDEwLjYzNCwzLjAyLDE5LjQ4Niw3Ljg3MSwyNS4xOTVjLTkuNDk2LDIxLjcwNi0zMC4wNjQsNzYuMzM3LTkuOTMzLDEwMy43NTMgIGMxLjI1LDEuNjk4LDIuOTc5LDIuOTksNC45NTksMy43MDhsMTQuNzEsNS4zNjVjMS4xNjcsMC40MzgsMi40MTcsMC42NDYsMy42NDYsMC42NDZjMS44NzUsMCwzLjc1LTAuNSw1LjM5Ni0xLjQ2OWwxMi41NDMtNy4zNTQgIGwxNi4wNjQsNC4wNTJjNC44NTUsMS4yMTksMTAuMDAxLTEuMTU2LDEyLjIwOS01LjY4OGw2LjE0Ni0xMi42NjdDNTEzLjIzNCwzNTYuMTM1LDUxMS42OTIsMzUwLjQwNiw1MDcuMzc5LDM0Ny40MTd6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
     }
     else {
      result = "data:image/jpeg;base64, " +comic.foto;
     
     }
     return this.sanitizer.bypassSecurityTrustUrl(result);
   }
 
   onClickComic(comic : Comic){
    this.router.navigate([`comics/${comic.id}`]);
   }
}
