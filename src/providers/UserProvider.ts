import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpMethodsInterface } from './HttpMethodsInterface';
import { User } from 'src/models/User';

@Injectable()
export class UserProvider implements HttpMethodsInterface {

    basicUrl : string = 'http://localhost:8080/B3servidorREST/webresources/app.entities.user/';

    constructor(private http: Http) {}

    private obtainHeaders() {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json;charset=utf-8');

        return headers;
    }

    all(): Observable<User[]> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl).pipe(map(response => { return response.json() }));
    }

    get(id: number): Observable<User> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    getUserByToken(token: string): Observable<User>{
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl +'userbytoken/' + token).pipe(map(response => { return response.json() }));
    }

    getRol(id: string): Observable<User>{
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    findById(id: string, user: User): Observable<User> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.put(this.basicUrl + id, user).pipe(map(response => { return response.json() }));
    }

    put(id: number, user: User): Observable<User> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.put(this.basicUrl + id, user).pipe(map(response => { return response.json() }));
    }
    post(user: User): Observable<User> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.post(this.basicUrl, user).pipe(map(response => { return response.json() }));
    }
    delete(id: number): Observable<User> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.delete(this.basicUrl + id).pipe(map(response => { return response.json() }));
    }

    count(): Observable<User> {
        let options = new RequestOptions({ headers:this.obtainHeaders(),withCredentials: true});
        return this.http.get(this.basicUrl + 'count').pipe(map(response => { return response.json() }));
    }
}