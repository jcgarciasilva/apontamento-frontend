import { UserService } from './../user.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Role } from 'src/app/auth/role.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = User.createUser({});
  profileForm: FormGroup;
  userId: string;
  rolesList: Role[] = [Role.ADMIN, Role.DEVELOPER];

  constructor(private auth: AuthService, private userService: UserService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.userId = params.get('uid');
        if (this.userId == this.auth.userUID) {
          this.auth.user$.subscribe(user => {
            this.user = user; this.buildForm();
          },
            () => console.log('Errrro'));
          console.log('else')
          console.log(this.user)
        }
        else {
          this.userService.getUser(this.userId)
            .subscribe(user => {
              this.user = user.data(); this.buildForm(); console.log(this.user)
            },
              error => console.error(error));
        }


      }
    );
    this.buildForm();
  }

  buildForm() {
    console.log(this.user)
    this.profileForm = this.formBuilder.group({
      email: [this.user?.email, [Validators.required,
      Validators.email]],
      name: [this.user?.name, [Validators.required, Validators.min(5)]],
      birthday: [this.user?.dateOfBirth, []],
      role: [this.user?.role, [Validators.required,],],
      address: [this.user?.address?.line1, []],
      city: [this.user?.address?.city, []],
      state: [this.user?.address?.state, []],
      postalCode: [this.user?.address?.zip, []],

    });
  }

}
