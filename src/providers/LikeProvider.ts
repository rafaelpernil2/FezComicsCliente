import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Like } from 'src/models/Like';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class LikeProvider implements HttpMethodsInterface {

    basicUrl : string = this.appSettings.json.Endpoints.FezComicRESTPy.Like;

    constructor(private http: Http, private appSettings : AppSettings) {}

    private obtainHeaders() {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Like[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl).pipe(map(response => { return response.json() }));
    }

    get(id: number): Observable<Like> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    getByUserAndComic(id_user: number, id_comic: number): Observable<Like> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + '/likebyuserandcomic/' + id_user + '/' + id_comic).pipe(map(response => { return response.json() }));
    }

    getLikesByComic(id_comic: number): Observable<Like[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + '/likesbycomic/' + id_comic ).pipe(map(response => { return response.json() }));
    }

    put(id: number, like: Like): Observable<Like> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: false});
        return this.http.put(this.basicUrl+ '/' + id + "/", like).pipe(map(response => { return response.json() }));
    }
    post(like: Like): Observable<Like> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.post(this.basicUrl, like).pipe(map(response => { return response.json() }));
    }
    delete(id: number): Observable<Like> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl+ '/' + id).pipe(map(response => { return response.json() }));
    }

    deleteByUserAndComic(id_user: number, id_comic: number): Observable<Like> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl+ '/likebyuserandcomic/' + id_user + '/' + id_comic).pipe(map(response => { return response.json() }));
    }

    count(id_comic: number): Observable<number> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl  + '/likesbycomic/count/' + id_comic).pipe(map(response => { return response.json() }));
    }
}