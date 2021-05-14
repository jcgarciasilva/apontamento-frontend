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
// import { CacheService } from './cache.service';


export interface User {
  uid: string,
  email: string,
  photoUrl?: string,
  displayName?: string
}

@Injectable()
export class AuthService extends CacheService {


  user$: Observable<User>;

  constructor(private angularFirebaseAuth: AngularFireAuth, private router: Router, private angularFirestore: AngularFirestore,) {
    super();
    this.user$ = this.angularFirebaseAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  getUser() {
    return this.angularFirebaseAuth.authState;
  }


  login(email: string, password: string) {
    return this.angularFirebaseAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['home']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.angularFirebaseAuth.signOut();
    this.router.navigate(['/']);
  }

}

