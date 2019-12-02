import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


import { ComicHasSerie } from 'src/models/ComicHasSerie';
import { Comic } from 'src/models/Comic';
import { Serie } from 'src/models/Serie';
import { AppSettings } from 'src/config/AppSettings';


@Injectable()
export class ComicHasSerieProvider {


    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.ComicHasSerie;


    constructor(private http: HttpClient, private appSettings: AppSettings) {}


    private obtainHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Access-Control-Allow-Origin' , '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<ComicHasSerie[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<ComicHasSerie[]>(this.basicUrl);
    }

    getSerieByComic(id: number): Observable<Serie[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Serie[]>(this.basicUrl + '/series/' + id);
    }

    get(comicId: number, serieId: number): Observable<ComicHasSerie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<ComicHasSerie>(this.basicUrl + '/comichasserie/' + comicId + '/' + serieId);
    }
    getComicsBySerie(id: number): Observable<Comic[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comic[]> (this.basicUrl + '/comics/' + id);
    }

    put(comicHasSerie: ComicHasSerie): Observable<ComicHasSerie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.put<ComicHasSerie>(this.basicUrl, comicHasSerie);
    }
    post(comicHasSerie: ComicHasSerie): Observable<ComicHasSerie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.post<ComicHasSerie>(this.basicUrl, comicHasSerie);
    }
    delete(comicId: number, serieId: number): Observable<ComicHasSerie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<ComicHasSerie>(this.basicUrl + '/'  +  'comichasserie/' +  comicId + '/' + serieId );
    }

    count(): Observable<ComicHasSerie> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<ComicHasSerie>(this.basicUrl + '/' + 'count');
    }
}
