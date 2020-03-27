import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  template: `
  <h1>Cadastros</h1>

  <nav mat-tab-nav-bar>
    <a mat-tab-link routerLink="/cadastro/clients" routerLinkActive #rla="routerLinkActive"
     active="rla.isActive">Clientes</a>
    <a mat-tab-link routerLink="/cadastro/project" routerLinkActive #rla="routerLinkActive"
     active="rla.isActive">Projetos</a>
    <a mat-tab-link routerLink="/cadastro/service" routerLinkActive #rla="routerLinkActive"
     active="rla.isActive">Serviços</a>
    <a mat-tab-link routerLink="/cadastro/parameter" routerLinkActive #rla="routerLinkActive"
     active="rla.isActive">Parâmetros</a>
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
