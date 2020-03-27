import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  template: `
  <h1>Cadastros</h1>

  <nav mat-tab-nav-bar>
    <a mat-tab-link routerLink="/cadastro/clients" routerLinkActive>Clientes</a>
    <a mat-tab-link [routerLink="/cadastro/project" routerLinkActive>Projetos</a>
    <a mat-tab-link [routerLink="/cadastro/service" routerLinkActive>Serviços</a>
    <a mat-tab-link [routerLink="/cadastro/paramter" routerLinkActive>Parâmetros</a>
</nav>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class CadastroComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
    });
  }

}
