import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ClientsComponent } from './clients/clients.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceComponent } from './service/service.component';


const routes: Routes = [
  {
    path: '', component: CadastroComponent, children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'project', component: ProjectsComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'parameter', component: ParameterComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
