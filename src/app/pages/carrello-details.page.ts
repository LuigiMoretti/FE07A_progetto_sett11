import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articolo } from '../models/articolo';
import * as Servizi from '../store.service';

@Component({
  template: `
  <h1>Dettagli</h1>

  <button type="button" class="btn btn-close mb-2 btn-indietro" [routerLink]="['/']"></button>
    <div *ngIf="articolo" class="card-body">
      <h5 class="card-title">{{ articolo.name }}</h5>
      <p class="card-text">
        {{ articolo.description }} <br />
        {{ articolo.price | currency: 'EUR' }}
      </p>
      <button type="button" class="btn btn-primary" (click)="aggiungi()">
        Aggiungi al carrello
      </button> <span *ngIf="conferma>0">Quantità: {{conferma}}</span>
    </div>
  `,
  styles: [`
  span{
    color:lime;
    margin-left:.3em;
    font-size:1.3rem;
    text-shadow: 0px 0px 2px black;
  }
  `],
})
export class CarrelloDetailsPage implements OnInit {
  articolo!: Articolo;
  sub!: Subscription;
  conferma = 0;
  constructor(private router: ActivatedRoute) {}



  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
    this.articolo = <Articolo>params;
    console.log(this.articolo);
    console.log(params);
    });
  }

  aggiungi() {
    Servizi.aggiungiAlCarrello(this.articolo);
    this.conferma += 1;
  }
}
