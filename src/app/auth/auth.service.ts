import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Role } from './role.enum';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../user/user';
// import { CacheService } from './cache.service';

@Injectable()
export class AuthService {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userUID: string = '';

  constructor(private angularFirebaseAuth: AngularFireAuth,
    private router: Router,
    private angularFirestore: AngularFirestore) {

    this.angularFirebaseAuth.setPersistence('local');

    this.angularFirebaseAuth.authState.subscribe(authUser => {
      if (authUser) {
        console.log('entrou no observable .....');
        this.isLoggedIn$.next(true);
        this.userUID = authUser.uid;
        this.angularFirestore.collection<User>('users').doc(authUser.uid)
          .get().subscribe(user => this.user$.next(user.data()));
      } else {
        console.log('Error for authUser');
        this.isLoggedIn$.next(false);
        this.user$.next(null);
        this.signOut();
      }
    });
  }

  getUser() {
    return this.angularFirebaseAuth.authState;
  }


  login(email: string, password: string) {
    this.angularFirebaseAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(`bem vindo ${result}`);
        console.log(result);

        this.isLoggedIn$.next(true);

        this.angularFirestore.doc<User>(`users/${result.user.uid}`)
          .valueChanges()
          .subscribe(authUser => {
            //this.updateUserData(authUser);
            this.user$.next(authUser);
          });
        this.router.navigate(['/home']);
      }).catch((error) => {
        window.alert(error.message);
      });
    // });
  }

  updateUserData(user) {
    // Sets ser data to firestore on login
    // let data: User;
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);

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

