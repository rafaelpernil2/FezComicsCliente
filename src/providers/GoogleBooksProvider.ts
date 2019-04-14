import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AppSettings } from 'src/config/AppSettings';


@Injectable()
export class GoogleBooksProvider {

    constructor(private http: Http,private appSettings : AppSettings) {}

    getBookByISBN(ISBN: string): Observable<any> {
        return this.http.get(this.appSettings.json.Endpoints.External.GoogleBooks +`${ISBN}`).pipe(map(response => { return response.json() }));
    }
}