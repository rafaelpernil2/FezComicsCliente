import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AppSettings } from 'src/config/AppSettings';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GoogleBooksProvider {

    constructor(private http: HttpClient, private appSettings: AppSettings) {}

    getBookByISBN(ISBN: string): Observable<any> {
        return this.http.get(this.appSettings.json.default.Endpoints.External.GoogleBooks + `${ISBN}`);
    }
}
