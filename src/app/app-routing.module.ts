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


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule), canLoad: [AuthGuard], data: { expectedRole: Role.Admin } },
  { path: 'user', component: UserComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'apontamento', component: ApontamentoComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

