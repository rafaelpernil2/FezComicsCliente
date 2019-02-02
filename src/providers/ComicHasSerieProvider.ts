import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

import { ComicHasSerie } from 'src/models/ComicHasSerie';
import { Comic } from 'src/models/Comic';
import { Serie } from 'src/models/Serie';


@Injectable()
export class ComicHasSerieProvider {

<<<<<<< HEAD
<<<<<<< HEAD
    basicUrl : string = 'https://back-api-dot-infra-triumph-229219.appspot.com/comichasseries/';
=======
    basicUrl : string = 'http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.comichasserie/';
>>>>>>> Listo para entregarse. Ahora se muestra tu nombre cuando inicias sesión y está enlazado al servidor en local
=======
    basicUrl : string = 'http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.comichasserie/';
>>>>>>> c3f8e910f7ea1fd11bc4c8ec6782576fe0b9ee12

    constructor(private http: Http) {}

   
    private obtainHeaders() {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<ComicHasSerie[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl).pipe(map(response => { return response.json() }));
    }

    getSerieByComic(id: number): Observable<Serie[]>{
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'series/' + id).pipe(map(response => { return response.json() }));
    }

    get(comicId: number, serieId : number): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'comichasserie/' +comicId + '/' + serieId + '/').pipe(map(response => { return response.json() }));
    }
    getComicsBySerie(id: number): Observable<Comic[]>{
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'comics/' + id).pipe(map(response => { return response.json() }));
    }

    put(comicHasSerie: ComicHasSerie): Observable<ComicHasSerie> {
        
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.put(this.basicUrl, comicHasSerie).pipe(map(response => { return response.json() }));
    }
    post(comicHasSerie: ComicHasSerie): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.post(this.basicUrl, comicHasSerie).pipe(map(response => { return response.json() }));
    }
    delete(comicId: number, serieId: number): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl  +  'comichasserie/' +  comicId + "/" + serieId  + "/").pipe(map(response => { return response.json() }));
    }

    count(): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'count').pipe(map(response => { return response.json() }));
    }
}