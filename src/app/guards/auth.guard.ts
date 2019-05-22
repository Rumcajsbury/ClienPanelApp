import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(
        private _router: Router,
        private _afAuth: AngularFireAuth
    )
    {}

    canActivate(): Observable<boolean>{
        let logged: boolean;
        this._afAuth.authState.subscribe( auth =>{
            if(!auth){
                this._router.navigate(['/login']);
                logged = false;
            }else{
                logged = true;
            }
        })

        return of(logged);
    }
    }