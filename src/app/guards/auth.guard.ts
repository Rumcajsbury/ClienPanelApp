import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _afAuth: AngularFireAuth,
        private _authService: AuthService
    ) { }

    canActivate(): Observable<boolean> {
        if (this._authService.authenticated) {
            return of(true);
        }
        else {
            this._router.navigate(['/login']);
            return of(false);
        }
    }
}