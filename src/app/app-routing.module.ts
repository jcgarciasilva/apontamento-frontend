import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApontamentoComponent } from './apontamento/apontamento.component';
import { AuthGuard } from './auth/auth-guard.service';
import { Role } from './auth/role.enum';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';
import { LoginLayoutComponent } from './login/login-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: '', component: AppComponent, children: [
      { path: 'home', component: HomeComponent, outlet: "master" },
      { path: 'cadastro', outlet: "master", loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule), canLoad: [AuthGuard], data: { expectedRole: Role.Admin } },
      { path: 'user', component: UserComponent, outlet: "master" },
      { path: 'user/profile', component: ProfileComponent, outlet: "master", canActivate: [AuthGuard] },
      { path: 'apontamento', component: ApontamentoComponent, outlet: "master" },
      { path: 'reports', component: ReportComponent, outlet: "master", },

    ]
    // , canLoad: [AuthGuard]
  },
  {
    path: '', component: LoginLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'login/:redirectUrl', component: LoginComponent },
    ]
  },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

