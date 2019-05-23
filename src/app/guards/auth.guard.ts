import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private _router: Router,
        private _afAuth: AngularFireAuth,
    ) { }

    canActivate(): Observable<boolean> {
        return this._afAuth.authState.pipe(map(auth => {
            if (!auth) {
                this._router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));

    }

}
