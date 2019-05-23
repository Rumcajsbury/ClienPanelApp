import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean = false;
  constructor(private _afAuth: AngularFireAuth) { }

  login(email: string, password: string)
  {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData =>{
        this.authenticated = true;
        resolve(userData)
      },
       err => reject(err));
    });
  }

  getAuth(){
    return this._afAuth.authState.pipe(auth => auth);
  }

  logout(){
    this.authenticated = false;
    this._afAuth.auth.signOut();
  }
}
