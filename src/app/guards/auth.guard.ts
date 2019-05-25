import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    canActivate(): Observable<boolean> {
        return this._authService.getAuth().pipe(map(auth => {
            if (!auth) {
                this._router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));
    }
}
