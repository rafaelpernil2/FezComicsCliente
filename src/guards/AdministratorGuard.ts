import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserProvider } from 'src/providers/UserProvider';
import { User } from 'src/models/User';

@Injectable()
export class AdministratorGuard implements CanActivate {

    constructor(
        private router: Router,
        private userProvider: UserProvider,
    ) {

    }
    rolId: Number;

    canActivate(route: ActivatedRouteSnapshot): boolean {
        
        this.userProvider.getUserByToken(sessionStorage.getItem("token")).subscribe(user => {



            this.rolId = (user.rolId.id);
            
            return this.rolId == 1;
        });
        
        //Hardodeao
       return true;
    }




}
    
