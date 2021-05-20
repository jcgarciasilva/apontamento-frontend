import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // this.auth.user$.subscribe(user => this.user = user);
  }

}
