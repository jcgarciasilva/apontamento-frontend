import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth-guard.service';
import { UiService } from '../common/ui.service';
import { MaterialModule } from '../material.module';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ClientsComponent } from './clients/clients.component';
import { FormComponent } from './clients/form/form.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceComponent } from './service/service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ClientsComponent,
    ProjectsComponent,
    ServiceComponent,
    ParameterComponent,
    CadastroComponent,
    FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CadastroRoutingModule,
    MaterialModule,
  ], exports: [
  ],
  providers: [AuthGuard, UiService,],
})
export class CadastroModule { }
