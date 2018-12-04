import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
 
@Injectable()
export class ComicProvider {
 
    constructor(
        public http: HttpClient
    ) {}

    all() : Observable<any> {
        return this.http.get('https://someserver.com/api/comics');
    }
 
    // add(comicname, password){
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let credentials = {
    //         user: comicname,
    //         password: password
    //     };
    //     return this.http.post('https://someserver.com/api/comics', , JSON.stringify(credentials), {headers: headers});
    // }
}