import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  template: `
  <mat-toolbar color="accent">
    <a mat-button routerLink="/cadastro/client" routerLinkActive="active-link">Manager's Dashboard</a>
    <a mat-button routerLink="/cadastro/project" routerLinkActive="active-link">User Management</a>
    <a mat-button routerLink="/cadastro/service" routerLinkActive="active-link">Receipt Lookup</a>
    <a mat-button routerLink="/cadastro/parameter" routerLinkActive="active-link">Receipt Lookup</a>   
  </mat-toolbar>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class CadastroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
