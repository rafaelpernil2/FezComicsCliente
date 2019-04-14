import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Rol } from 'src/models/Rol';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class RolProvider implements HttpMethodsInterface {


    basicUrl : string = this.appSettings.json.Endpoints.FezComicRESTPy.Rol;


    constructor(private http: Http, private appSettings: AppSettings) {}

    private obtainHeaders() {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Rol[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl).pipe(map(response => { return response.json() }));
    }

    get(id: number): Observable<Rol> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl+ '/' + id).pipe(map(response => { return response.json() }));
    }

    put(id: number, rol: Rol): Observable<Rol> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.put(this.basicUrl + '/' + id + '/', rol).pipe(map(response => { return response.json() }));
    }
    post(rol: Rol): Observable<Rol> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.post(this.basicUrl, rol).pipe(map(response => { return response.json() }));
    }
    delete(id: number): Observable<Rol> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl+ '/' + id).pipe(map(response => { return response.json() }));
    }

    count(): Observable<Rol> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl+ '/' + 'count').pipe(map(response => { return response.json() }));
    }
}