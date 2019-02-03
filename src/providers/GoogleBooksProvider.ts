import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GoogleBooksProvider {

    constructor(private http: Http) {}

    getBookByISBN(ISBN: string): Observable<any> {
        return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`).pipe(map(response => { return response.json() }));
    }
}