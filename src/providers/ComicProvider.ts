import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Comic } from 'src/models/Comic';

@Injectable()
export class ComicProvider implements HttpMethodsInterface {

    basicUrl : string = 'http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.comic/';

    constructor(private http: Http) {}

    private obtainHeaders() {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Comic[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl).pipe(map(response => { return response.json() }));
    }

    get(id: number): Observable<Comic> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }
    getByNombre(nombre: string): Observable<Comic> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'nombre/' + nombre).pipe(map(response => { return response.json() }));
    }

    put(id: number, comic: Comic): Observable<Comic> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: false});
        return this.http.put(this.basicUrl + id, comic).pipe(map(response => { return response.json() }));
    }
    post(comic: Comic): Observable<Comic> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.post(this.basicUrl, comic).pipe(map(response => { return response.json() }));
    }
    delete(id: number): Observable<Comic> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    count(): Observable<Comic> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'count').pipe(map(response => { return response.json() }));
    }
}