import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class QuoteProvider {

    constructor(private http: Http) {}

    getQOD(): Observable<any> {
        return this.http.get("https://quotes.rest/qod.json").pipe(map(response => { return response.json() }));
    }
}