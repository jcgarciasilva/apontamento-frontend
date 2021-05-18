import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sign } from 'fake-jwt-sign';
import * as decode from 'jwt-decode';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { transformError } from '../common/common';
import { CacheService } from './cache.service';
import { Role } from './role.enum';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../user/user';
// import { CacheService } from './cache.service';

@Injectable()
export class AuthService extends CacheService {

  constructor(private angularFirebaseAuth: AngularFireAuth, private router: Router, private angularFirestore: AngularFirestore,) {
    super();
  }


  user$: Observable<User>;

  async;

  getUser() {
    return this.angularFirebaseAuth.authState;
  }


  login(email: string, password: string) {
    return this.angularFirebaseAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(`bem vindo ${result}`);
        console.log(result);
        this.user$ = this.angularFirebaseAuth.authState.pipe(
          switchMap(user => {
            // Logged in
            if (user) {
              console.log(user);
              this.updateUserData(user);
              return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
              // Logged out
              return of(null);
            }
          }));
        this.router.navigate(['/home']);
      }
      ).catch((error) => {
        window.alert(error.message);
      });
  }

  updateUserData(user) {
    // Sets user data to firestore on login
    // let data: User;
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);

    console.log(user);
    console.log('userref');
    console.log(userRef.get());

    const data = User.createUser({
      uid: user.uid,
      email: user.email
    });


    return userRef.set(JSON.parse(JSON.stringify(data)), { merge: true });

  }
  signOut() {
    this.angularFirebaseAuth.signOut();
    this.router.navigate(['/login']);
  }

}

