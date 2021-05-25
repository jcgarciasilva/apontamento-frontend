import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, loggedIn } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ApontamentoComponent } from './apontamento/apontamento.component';
import { Role } from './auth/role.enum';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginLayoutComponent } from './login/login-layout.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'home', component: HomeComponent, },
      {
        path: 'cadastro', loadChildren: () =>
          import('./cadastro/cadastro.module').then(m => m.CadastroModule),
        // canLoad: [AuthGuard],
        data: { expectedRole: Role.ADMIN }
      },
      { path: 'user', component: UserComponent, },
      { path: 'user/profile/:uid', component: ProfileComponent, },
      { path: 'apontamento', component: ApontamentoComponent, },
      { path: 'reports', component: ReportComponent, },

    ]
    // , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: loggedIn }
  },
  {
    path: '', component: LoginLayoutComponent, children: [
      { path: 'login', component: LoginComponent, },
      // { path: 'login/:redirectUrl', component: LoginComponent, outlet: 'login-router' },
    ]
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

