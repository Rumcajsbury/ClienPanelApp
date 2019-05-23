import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _authService: AuthService,
    private _flashMessages: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    this._authService.register(this.email, this.password)
      .then(() => {
        this._flashMessages.show('You are now registered and logged', { cssClass: 'alert-success', timeout: 4000 });
        this._router.navigate(['/']);
      })
      .catch(err => {
        this._flashMessages.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
      });
    }
}
