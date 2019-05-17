import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private _flashMessagesService: FlashMessagesService,
     private router: Router,
     private clientService: ClientService
     ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd === true){
      value.balance = 0;
    }

    if(!valid){
      //Show error
      this._flashMessagesService.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    }else{
      //Add new client
      this.clientService.newClient(value)
      //Show message
      this._flashMessagesService.show('New client added', {cssClass: 'alert-success', timeout: 4000});
      //redirect to dashboard
      this.router.navigate(['']);
    }
  }

}
