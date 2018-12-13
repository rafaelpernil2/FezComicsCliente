import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { ComicHasSerie } from 'src/models/ComicHasSerie';
import { Comic } from 'src/models/Comic';


@Injectable()
export class ComicHasSerieProvider implements HttpMethodsInterface {

    basicUrl : string = 'http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.comichasserie/';

    constructor(private http: Http) {}

    private obtainHeaders() {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');

        return headers;
    }

    all(): Observable<ComicHasSerie[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl).pipe(map(response => { return response.json() }));
    }

    get(id: number): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    findById(id: number): Observable<Comic[]>{
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'comics/' + id).pipe(map(response => { return response.json() }));
    }

    put(id: number, comicHasSerie: ComicHasSerie): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.put(this.basicUrl + id, comicHasSerie).pipe(map(response => { return response.json() }));
    }
    post(comicHasSerie: ComicHasSerie): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.post(this.basicUrl, comicHasSerie).pipe(map(response => { return response.json() }));
    }
    delete(id: number): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    count(): Observable<ComicHasSerie> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'count').pipe(map(response => { return response.json() }));
    }
}