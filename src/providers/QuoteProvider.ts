import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../config/AppSettings';

@Injectable()
export class QuoteProvider {

    constructor(private http: Http,
        private appSettings: AppSettings) {
    }

    getQOD(): Observable<any> {
        return this.http.get(this.appSettings.json.Endpoints.External.Quote).pipe(map(response => { return response.json() }));
    }
}