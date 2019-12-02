import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Comic } from 'src/models/Comic';
import { AppSettings } from 'src/config/AppSettings';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ComicProvider implements HttpMethodsInterface {


    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Comic;


    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    private obtainHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Access-Control-Allow-Origin' , '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Comic[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comic[]>(this.basicUrl);
    }

    get(id: number): Observable<Comic> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comic>(this.basicUrl + '/' + id);
    }
    getByNombre(nombre: string): Observable<Comic> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comic>(this.basicUrl + 'comicsbynombre/' + nombre);
    }

    put(id: number, comic: Comic): Observable<Comic> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.put<Comic>(this.basicUrl + '/' + id , comic);
    }
    post(comic: Comic): Observable<Comic> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.post<Comic>(this.basicUrl, comic);
    }
    delete(id: number): Observable<Comic> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<Comic>(this.basicUrl + '/' + id);
    }

    count(): Observable<Comic> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comic>(this.basicUrl + '/' + 'count');
    }
}
