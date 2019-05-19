import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client ={
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean = true;

  constructor(
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _flashMessage: FlashMessagesService ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    this._clientService.getClientById(this.id).subscribe(client => this.client = client);
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(!valid){
      this._flashMessage.show('Please fill out the from correctly', {cssClass: 'alert-danger', timeout: 4000})
    }
    else{
      //Add id to client
      value.id = this.id;
      //Update client
      this._clientService.updateClient(value);
      //Success flashmessage
      this._flashMessage.show('Client updated', {cssClass: 'alert-success', timeout: 4000})
    }

    this._router.navigate([`/client/${this.id}`]);
  }

}
