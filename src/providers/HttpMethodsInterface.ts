import { Observable } from "rxjs";

export interface HttpMethodsInterface {
    all() : Observable<any>,
    get(id : number) : Observable<any>,
    put(id : number, person : any) : Observable<any>,
    post(person : any) : Observable<any>,
    delete(id : number) : Observable<any>,
    count(options : any) : Observable<any>
}