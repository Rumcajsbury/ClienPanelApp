import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from 'src/app/models/Client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _flashMessage: FlashMessagesService ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    this._clientService.getClientById(this.id).subscribe(client =>{
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
        this.client = client;
      }
      });
    }
}