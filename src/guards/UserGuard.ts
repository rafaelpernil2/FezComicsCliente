import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserProvider } from 'src/providers/UserProvider';
import { Observable } from 'rxjs';
import { DataUtil } from 'src/utils/DataUtil';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private router: Router,
        private userProvider: UserProvider,
    ) {

    }
    rolId: number;

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        const observer: Observable<boolean> = new Observable(suscriber => {
            this.userProvider.getUserByToken(DataUtil.getCookie('token')).subscribe(user => {
                suscriber.next(!!user);
            });
        });

        return observer;
    }


}
