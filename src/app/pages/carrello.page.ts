import { Component, OnInit } from '@angular/core';
import { Articolo } from '../models/articolo';
import * as Servizi from '../store.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  template: `
  <!--{{articoliCarrello[0].id}}{{articoliCarrello[1].id}}-->
<div class="container-fluid">
  <div class="row">
      <div class="mb-4 col-sm-5" *ngFor="let articolo of articoliCarrello">
      <div class="card-body">
        <h5 class="card-title">{{articolo.name}}</h5>
        <p class="card-text">{{articolo.description}} <br> {{articolo.price | currency : 'EUR'}}</p>
        <button type="button" class="btn-close bg-danger" (click)="rimuovi(articolo)"></button>
       </div>
      </div>
  </div>
</div>

    <div class="container">
      <h2>Completa l'ordine</h2>
      <form (ngSubmit)="submit()" #f="ngForm">
          <div ngModelGroup="userInfo">
            <div class="form-group">
              <label for="name">Nome</label>
              <input class="form-control" ngModel name="nome" type="text" required #name="ngModel">
              <p *ngIf="name.invalid">* Campo richiesto! *</p>
              <label for="indirizzo">Indirizzo</label>
              <input class="form-control" ngModel name="indirizzo" type="text" required #indirizzo="ngModel">
              <p *ngIf="indirizzo.invalid">* Campo richiesto! *</p>
              <input type="submit" [disabled]="f.invalid" value="invia" class="btn btn-primary mt-2">
            </div>
          </div>
      </form>
    </div>
  `,
  styles: [`
     input.ng-invalid.ng-touched {
      border:1px solid red;
    }
     .card-body{
      width:100%!important;

      }
    `],
})
export class CarrelloPage implements OnInit {
  articoliCarrello: Articolo[] = Servizi.carrello;

  @ViewChild("f", {static:true}) form!:NgForm;

  user:any = {};

  submit(){
    console.log('form inviato', this.form);
    this.user.nome = this.form.value.userInfo.nome;
    this.user.indirizzo = this.form.value.userInfo.indirizzo;

    let riepilogo = [];

    for (let i of this.articoliCarrello) {
      if (riepilogo.length > 0) {
        riepilogo.push(' ' + i.name);
      } else {
        riepilogo.push(i.name);
      }
    }

    alert(
      "La tua ricevuta d'acquisto \n" +
        'Numero Ordine: ' +
        Math.floor(Math.random() * 10000000) +
        '\n' +
        'Nome: ' +
        this.user.nome +
        '\n' +
        'Indirizzo: ' +
        this.user.indirizzo +
        '\n' +
        riepilogo
    );


    Servizi.carrello.length=0;
    this.form.reset()
  }

  rimuovi(articolo:Articolo){
    Servizi.rimuoviDalCarrello(articolo);
    this.articoliCarrello=Servizi.carrello;
  }
  constructor() {}

  ngOnInit(): void {

  }
}
