import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ILogonUser } from './logon-user';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor (private authService: AuthService, 
        private loginService: LoginService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log ("Guard state url:" + state.url);

        if (this.authService.isAuthenticate)
            return true;
        else {
            this.loginService.signInUser();  
            this.authService.redirectUrl = state.url;
            console.log ('MASUK CAN ACTIVATE');
            return false;
        }
        //let logonUser: ILogonUser = this.loginService.getLogonUser();
    }
}
