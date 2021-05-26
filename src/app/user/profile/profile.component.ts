import { UiService } from 'src/app/common/ui.service';
import { UserService } from './../user.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ProfileComponent implements OnInit, OnDestroy {

  userToModify: User = User.createUser({});
  profileForm: FormGroup;
  userId: string;
  rolesList: Role[] = [Role.ADMIN, Role.DEVELOPER];

  constructor(private auth: AuthService, private userService: UserService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.userId = params.get('uid');
        if (this.userId === this.auth.userUID) {
          this.auth.user$.subscribe(user => {
            this.userToModify = user; this.buildForm();
          },
            () => console.log('Errrro'));
        }
        else {
          this.userService.getUser(this.userId)
            .subscribe(user => {
              this.userToModify = user.data();
              this.buildForm();
            },
              error => console.log(error));
        }
      }
    );
    this.buildForm();
  }

  buildForm() {
    console.log(this.userToModify)
    this.profileForm = this.formBuilder.group({
      email: [{
        value: this.userToModify?.email, disabled: this.userToModify?.email
      }, [Validators.required,
      Validators.email]],
      name: [this.userToModify?.name, [Validators.required, Validators.min(5)]],
      birthday: [this.userToModify?.dateOfBirth, []],
      role: [this.userToModify?.role, [Validators.required,],],
      address: [this.userToModify?.address?.line1, []],
      city: [this.userToModify?.address?.city, []],
      state: [this.userToModify?.address?.state, []],
      postalCode: [this.userToModify?.address?.zip, []],

    });
  }

  save() {

    this.userToModify.email = this.profileForm.get('email').value;
    this.userToModify.name = this.profileForm.get('name').value;
    this.userToModify.dateOfBirth = new Date(this.profileForm.get('birthday').value);
    this.userToModify.role = this.profileForm.get('role').value;
    this.userToModify.address.line1 = this.profileForm.get('address').value;
    this.userToModify.address.city = this.profileForm.get('city').value;
    this.userToModify.address.state = this.profileForm.get('state').value;
    this.userToModify.address.zip = this.profileForm.get('postalCode').value;

    if (this.userToModify.uid === '' || this.userToModify.uid === undefined) {
      this.userService.add(this.userToModify);
    }
    else {
      this.userService.update(this.userToModify);
    }

  }

}
