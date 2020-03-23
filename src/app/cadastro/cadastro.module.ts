import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceComponent } from './service/service.component';
import { ParameterComponent } from './parameter/parameter.component';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [ClientsComponent, ProjectsComponent, ServiceComponent, ParameterComponent, CadastroComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CadastroRoutingModule
  ]
})
export class CadastroModule { }
