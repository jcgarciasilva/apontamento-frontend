import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = '';
  redirectUrl;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')));
  }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.userName, submittedForm.value.password)
  }

  homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Admin:
        return '/home';
      case Role.Atualiza:
        return '/apontamentos';
      case Role.Visualiza:
        return '/apontamntos';
      default:
        return '/users';
    }
  }


}
