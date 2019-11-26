import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Comentario } from 'src/models/Comentario';
import { AppSettings} from '../config/AppSettings';

@Injectable()
export class ComentarioProvider implements HttpMethodsInterface {

    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Comentario;

    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    private obtainHeaders() {
        let headers = new HttpHeaders()
        headers = headers.append('Access-Control-Allow-Origin' , '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Comentario[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comentario[]>(this.basicUrl);
    }

    get(id: number): Observable<Comentario> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comentario>(this.basicUrl + id);
    }

    getComentariosByComic(idComic: number): Observable<Comentario[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comentario[]>(this.basicUrl + '/comentariosbycomic/' + idComic);
    }



    put(id: number, comentario: Comentario): Observable<Comentario> {
        const options = { headers: this.obtainHeaders(), withCredentials: false};
        return this.http.put<Comentario>(this.basicUrl + '/' + id , comentario);
    }
    post(comentario: Comentario): Observable<Comentario> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.post<Comentario>(this.basicUrl, comentario);
    }
    delete(id: number): Observable<Comentario> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<Comentario>(this.basicUrl + '/' + id);
    }

    count(): Observable<Comentario> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<Comentario>(this.basicUrl + '/count');
    }
}
