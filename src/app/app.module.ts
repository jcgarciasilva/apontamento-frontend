import { ProfileComponent } from './user/profile/profile.component';
import { LoginLayoutComponent } from './login/login-layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LayoutComponent } from './layout/layout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

const firebaseConfig = {
  apiKey: 'AIzaSyBkG4RIlpWthe63BiVrfLmItfKD5ginmR0',
  authDomain: 'oportuna-apontamento.firebaseapp.com',
  databaseURL: 'https://oportuna-apontamento-default-rtdb.firebaseio.com',
  projectId: 'oportuna-apontamento',
  storageBucket: 'oportuna-apontamento.appspot.com',
  messagingSenderId: '193111487799',
  appId: '1:193111487799:web:e5575ed3299f68c41796b2',
  measurementId: 'G-G8RRDPZPED'
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
    LoginLayoutComponent,
    LoginComponent,
    SimpleDialogComponent,
    LayoutComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    MatDatepickerModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    CadastroModule,
    ReactiveFormsModule,
    LayoutModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
  ],
  providers: [
    UiService,
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
