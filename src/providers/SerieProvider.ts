import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
 
@Injectable()
export class SerieProvider implements HttpMethodsInterface {
 
    constructor(private http : Http){
        // let headers = new Headers();
        // let token = localStorage.getItem('Authorization')?JSON.parse(localStorage.getItem('Authorization')).token:null;
        // headers.set('Authorization',token);
    }

    all() : Observable<any> {
        var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers,withCredentials: true});
        return this.http.get(`http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.serie/`)
        .pipe(map(response => { return response.json() }));
    }

    get(id: number): Observable<any> {
        var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers,withCredentials: true});
        return this.http.get(`http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.serie/${id}`)
        .pipe(map(response => { return response.json() }));
    }

    put(id: number, serie: any): Observable<any> {
        var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers,withCredentials: true});
        return this.http.put(`http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.serie/${id}`, serie)
        .pipe(map(response => { return response.json() }));
    }
    post(serie: any): Observable<any> {
        var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers,withCredentials: true});
        return this.http.post(`http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.serie/`, serie)
        .pipe(map(response => { return response.json() }));
    }
    delete(id: number): Observable<any> {
        var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers,withCredentials: true});
        return this.http.delete(`http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.serie/${id}`)
        .pipe(map(response => { return response.json() }));
    }

    count(): Observable<any> {
        var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers,withCredentials: true});
        return this.http.get(`http://fezcomic.jelastic.cloudhosted.es/B3servidorREST/webresources/app.entities.serie/count`)
        .pipe(map(response => { return response.json() }));
    }
}