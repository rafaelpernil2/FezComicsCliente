import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { Rol } from 'src/models/Rol';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class RolProvider implements HttpMethodsInterface {


    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Rol;


    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    private obtainHeaders() {
        let headers = new HttpHeaders()
        headers = headers.append('Access-Control-Allow-Origin' , '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<Rol[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get(this.basicUrl);
    }

    get(id: number): Observable<Rol> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get(this.basicUrl + '/' + id);
    }

    put(id: number, rol: Rol): Observable<Rol> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.put(this.basicUrl + '/' + id + '/', rol);
    }
    post(rol: Rol): Observable<Rol> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.post(this.basicUrl, rol);
    }
    delete(id: number): Observable<Rol> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete(this.basicUrl + '/' + id);
    }

    count(): Observable<Rol> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get(this.basicUrl + '/' + 'count');
    }
}
