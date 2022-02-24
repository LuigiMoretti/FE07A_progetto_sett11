import { Component, OnInit } from '@angular/core';
import { carrello } from '../store.service';
@Component({
  selector: 'app-navbar',
  template: `
   <nav class="navbar navbar-expand navbar-dark bg-info mb-5">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link" [routerLink]="['/']" routerLinkActive="active" >Negozio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/carrello']"routerLinkActive="active">Carrello {{carrelloNav.length}}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
carrelloNav = carrello
  constructor() { }

  ngOnInit(): void {
  }

}
