import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../services/settings.service';

@Injectable({
    providedIn: 'root'
})

export class RegisterGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private _router: Router,
        private _settingsService: SettingsService,
        private _flashMessages: FlashMessagesService
    ) { }

    canActivate(): boolean {
        if(this._settingsService.getSettings().allowRegistration){
            return true;
        }else{
            this._flashMessages.show('Registration is disabled', {cssClass: 'alert-warning', timeout: 4000})
            this._router.navigate(['/login']);
            return false;
        }
    }
}
