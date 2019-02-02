import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

import { ComicHasSerie } from 'src/models/ComicHasSerie';
import { Comic } from 'src/models/Comic';
import { Serie } from 'src/models/Serie';


@Injectable()
export class ComicHasSerieProvider {

    basicUrl : string = 'https://back-api-dot-infra-triumph-229219.appspot.com/comichasseries/';

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