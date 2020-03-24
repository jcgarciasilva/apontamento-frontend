import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceComponent } from './service/service.component';
import { ParameterComponent } from './parameter/parameter.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [ClientsComponent, ProjectsComponent, ServiceComponent, ParameterComponent, CadastroComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    CadastroRoutingModule
  ]
})
export class CadastroModule { }
