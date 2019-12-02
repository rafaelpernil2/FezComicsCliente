import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Like } from 'src/models/Like';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class LikeProvider implements HttpMethodsInterface {

    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Like;

    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    private obtainHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Access-Control-Allow-Origin' , '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Like[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Like[]>(this.basicUrl);
    }

    get(id: number): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Like>(this.basicUrl + id);
    }

    getByUserAndComic(idUser: number, idComic: number): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Like>(this.basicUrl + '/likebyuserandcomic/' + idUser + '/' + idComic);
    }

    getLikesByComic(idComic: number): Observable<Like[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Like[]>(this.basicUrl + '/likesbycomic/' + idComic );
    }

    put(id: number, like: Like): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: false};
        return this.http.put<Like>(this.basicUrl + '/' + id + '/', like);
    }
    post(like: Like): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.post<Like>(this.basicUrl, like);
    }
    delete(id: number): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<Like>(this.basicUrl + '/' + id);
    }

    deleteByUserAndComic(idUser: number, idComic: number): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<Like>(this.basicUrl + '/likebyuserandcomic/' + idUser + '/' + idComic);
    }

    count(idComic: number): Observable<number> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<number>(this.basicUrl  + '/likesbycomic/count/' + idComic);
    }
}
