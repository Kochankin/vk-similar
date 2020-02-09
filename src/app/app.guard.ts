import { LocalStorageService } from './shared/local-storage-service/local-storage.service';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { LoginService } from './login/login-service/login.service';
 
@Injectable()
export class AppGuard implements CanActivate{
    constructor(
        private _router: Router,
        private _loginService: LoginService, 
    ){}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean { 
        if (!this._loginService.isLoggedIn) {
            this._router.navigate(['login']);
        }
        return this._loginService.isLoggedIn;
    }
}