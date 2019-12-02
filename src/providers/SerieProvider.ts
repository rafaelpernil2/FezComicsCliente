import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Serie } from 'src/models/Serie';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class SerieProvider implements HttpMethodsInterface {


    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Serie;


    constructor(private http: HttpClient, private appSettings: AppSettings) { }

    private obtainHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Access-Control-Allow-Origin', '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Serie[]> {

        const options = { headers: this.obtainHeaders(), withCredentials: true };
        return this.http.get<Serie[]>(this.basicUrl);
    }

    get(id: number): Observable<Serie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true };
        return this.http.get<Serie>(this.basicUrl + '/' + id);
    }

    put(id: number, serie: Serie): Observable<Serie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true };
        return this.http.put<Serie>(this.basicUrl + '/' + id, serie);
    }
    post(serie: Serie): Observable<Serie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true };
        return this.http.post<Serie>(this.basicUrl, serie);
    }
    delete(id: number): Observable<Serie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true };
        return this.http.delete<Serie>(this.basicUrl + '/' + id);
    }

    count(): Observable<Serie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true };
        return this.http.get<Serie>(this.basicUrl + 'count');
    }
}
