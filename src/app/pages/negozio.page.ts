import { Component, OnInit } from '@angular/core';
import * as Servizi from '../store.service';
import { Articolo } from '../models/articolo';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs';
@Component({
  template: `

    <p *ngIf ='articoliNegozio.length==0' class="loading">loading...</p>


    <div class="mb-4" *ngFor="let articolo of articoliNegozio">
      <div class="card-body">
        <h5 class="card-title">{{articolo.name}}</h5>
        <hr>
        <p class="card-text">{{articolo.price | currency : 'EUR'}}</p>
        <button type="button" class="btn btn-primary" [routerLink]="['/details', articolo]">Dettagli</button>
      </div>
  `,
  styles: [`
.loading{
font-size: 3rem;
margin-left: 2em;
}
  `],
})
export class NegozioPage implements OnInit {
  articoliNegozio: Articolo[]=[];

  constructor(private http:HttpClient) {}

  ngOnInit(): void {

    setInterval(()=>{
      this.articoliNegozio=Servizi.articoli;
    },20)
  }

}
