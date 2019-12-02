import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HttpMethodsInterface } from './HttpMethodsInterface';
import { User } from 'src/models/User';
import { AppSettings } from 'src/config/AppSettings';

@Injectable()
export class UserProvider implements HttpMethodsInterface {


    basicUrl: string = this.appSettings.json.default.Endpoints.FezComicRESTPy.User;


    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    private obtainHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Access-Control-Allow-Origin' , '*');
        headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('content-type', 'application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<User[]> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<User[]>(this.basicUrl);
    }

    get(id: number): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<User>(this.basicUrl + '/'  + id);
    }

    getUserByToken(token: string): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<User>(this.basicUrl + '/getuserbytoken/' + token);
    }

    getRol(id: string): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<User>(this.basicUrl + '/'  + id);
    }

    findById(id: string, user: User): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.put<User>(this.basicUrl + '/'  + id, user);
    }

    put(id: number, user: User): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.put<User>(this.basicUrl + '/'  + id, user);
    }
    post(user: User): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.post<User>(this.basicUrl, user);
    }
    delete(id: number): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.delete<User>(this.basicUrl  + '/' + id);
    }

    count(): Observable<User> {
        const options = { headers: this.obtainHeaders(), withCredentials: true};
        return this.http.get<User>(this.basicUrl + '/'  + 'count');
    }
}
