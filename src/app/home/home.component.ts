import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  private _displayLogin = true;
  // displayLogin = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.authStatus.subscribe(
    //   authStatus => (this._displayLogin = !authStatus.isAuthenticated)
    // );
  }

  get displayLogin() {
    return this._displayLogin;
  }

}
