import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from 'src/config/AppSettings';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthProvider {


    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.Auth;


    constructor(private http: HttpClient, private appSettings: AppSettings) { }

    private obtainHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('content-type', 'application/x-www-form-urlencoded');
        return headers;
    }

    verifyToken(token: string): Observable<object> {
        const options = { headers: this.obtainHeaders() };
        const request = `idtoken=${token}`;
        console.log(options);
        return this.http.post(this.basicUrl, request, options);
    }




}
