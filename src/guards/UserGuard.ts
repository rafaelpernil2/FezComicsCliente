import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserProvider } from 'src/providers/UserProvider';
import { Observable } from 'rxjs';
 
@Injectable()
export class UserGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private userProvider: UserProvider,
    ) {

    }
    rolId: Number;

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        let observer : Observable<boolean> = new Observable(suscriber => {
            this.userProvider.getUserByToken(sessionStorage.getItem("token")).subscribe(user => {                
                suscriber.next(!!user);
            });
        });

        return observer;
    }
 
}