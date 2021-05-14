import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApontamentoComponent } from './apontamento/apontamento.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AuthService } from './auth/auth.service';
import { CadastroModule } from './cadastro/cadastro.module';
import { SimpleDialogComponent } from './common/simple-dialog/simpleDialog.component';
import { UiService } from './common/ui.service';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';

const firebaseConfig = {
  apiKey: "AIzaSyBkG4RIlpWthe63BiVrfLmItfKD5ginmR0",
  authDomain: "oportuna-apontamento.firebaseapp.com",
  databaseURL: "https://oportuna-apontamento-default-rtdb.firebaseio.com",
  projectId: "oportuna-apontamento",
  storageBucket: "oportuna-apontamento.appspot.com",
  messagingSenderId: "193111487799",
  appId: "1:193111487799:web:e5575ed3299f68c41796b2",
  measurementId: "G-G8RRDPZPED"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ReportComponent,
    MenuNavComponent,
    UserComponent,
    ApontamentoComponent,
    DashboardsComponent,
    LoginComponent,
    SimpleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    CadastroModule,
    ReactiveFormsModule,
    CadastroModule,
    LayoutModule,
  ],
  providers: [
    UiService,
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
