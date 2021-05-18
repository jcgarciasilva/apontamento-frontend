import { Injectable } from '@angular/core';
import { User, IUser } from './user';
import { CacheService } from '../auth/cache.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { unescapeIdentifier } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private angularFirestore: AngularFirestore, private angularFirebaseAuth: AngularFireAuth,) { }

  getUser(uid: string) {
    return this.angularFirestore.collection<User>('users').doc(uid).get();
  }

  update(user: User) {
    const userRef = this.angularFirestore.collection<User>('users').doc(user.uid);
    userRef.set(JSON.parse(JSON.stringify(user)), { merge: true });
  }

  add(user: User) {

    this.angularFirebaseAuth.createUserWithEmailAndPassword(user.email, 'oportuna')
      .then((result) => {
        user.uid = result.user.uid;
        this.angularFirestore.collection('users').doc(result.user.uid).set(user);
        result.user.sendEmailVerification();
      }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
  }
}
