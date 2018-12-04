import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
 
@Injectable()
export class SerieProvider {
 
    constructor(
        public http: HttpClient
    ) {}

    all() : Observable<any> {
        return this.http.get('https://someserver.com/api/series');
    }
 
    // add(seriename, password){
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let credentials = {
    //         user: seriename,
    //         password: password
    //     };
    //     return this.http.post('https://someserver.com/api/series', , JSON.stringify(credentials), {headers: headers});
    // }
}