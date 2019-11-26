import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Like } from 'src/models/Like';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class LikeProvider implements HttpMethodsInterface {

    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Like;

    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    private obtainHeaders() {
        let headers = new HttpHeaders()
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

    getByUserAndComic(id_user: number, id_comic: number): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Like>(this.basicUrl + '/likebyuserandcomic/' + id_user + '/' + id_comic);
    }

    getLikesByComic(id_comic: number): Observable<Like[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Like[]>(this.basicUrl + '/likesbycomic/' + id_comic );
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

    deleteByUserAndComic(id_user: number, id_comic: number): Observable<Like> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<Like>(this.basicUrl + '/likebyuserandcomic/' + id_user + '/' + id_comic);
    }

    count(id_comic: number): Observable<number> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<number>(this.basicUrl  + '/likesbycomic/count/' + id_comic);
    }
}
