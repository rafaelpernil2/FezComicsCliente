import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppSettings } from '../config/AppSettings';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuoteProvider {

    constructor(private http: HttpClient,
                private appSettings: AppSettings) {
    }

    getQOD(): Observable<any> {
        return this.http.get(this.appSettings.json.default.Endpoints.External.Quote);
    }
}
