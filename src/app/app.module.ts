import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ApontamentoComponent } from './apontamento/apontamento.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroModule } from './cadastro/cadastro.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ReportComponent,
    MenuNavComponent,
    UserComponent,
    ApontamentoComponent,
    DashboardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CadastroModule,
    LayoutModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
