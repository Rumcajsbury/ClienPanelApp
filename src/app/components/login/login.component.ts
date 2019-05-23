import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessages: FlashMessagesService,
  ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    this._authService.login(this.email, this.password)
      .then(() => {
        this._flashMessages.show('You are now logged in', { cssClass: 'alert-success', timeout: 4000 });
        this._router.navigate(['/']);
      })
      .catch(err => {
        this._flashMessages.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
      });

  }
}
