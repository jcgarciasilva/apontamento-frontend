import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  template: `
  <h1>Cadastros</h1>
 <mat-divider></mat-divider>
  <nav mat-tab-nav-bar>
    <a mat-tab-link routerLink="/cadastro/clients"
     active="activeLink == link">Clientes</a>
    <a mat-tab-link routerLink="/cadastro/project"
     active="activeLink == link">Projetos</a>
    <a mat-tab-link routerLink="/cadastro/service"
     active="activeLink == link">Serviços</a>
    <a mat-tab-link routerLink="/cadastro/parameter"
     active="activeLink == link">Parâmetros</a>
</nav>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class CadastroComponent implements OnInit {

  link: string;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      console.log(this.router.url);
      console.log(res);
      this.link = this.router.url;
    });
  }

}
