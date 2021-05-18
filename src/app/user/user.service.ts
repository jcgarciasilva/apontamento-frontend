import { Injectable } from '@angular/core';
import { User, IUser } from './user';
import { CacheService } from '../auth/cache.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheService {


  constructor(private angularFirestore: AngularFirestore, private angularFirebaseAuth: AngularFireAuth,) {
    super();

  }

  getUser(uid) {
    return this.angularFirestore.collection<User>('users', q => q.where('uid', '==', uid)).get();
  }

  update(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);
    userRef.set(JSON.parse(JSON.stringify(user)), { merge: true });
  }

  add(user: User) {

    this.angularFirebaseAuth.createUserWithEmailAndPassword(user.email, 'oportuna')
      .then((result) => {
        user.uid = result.user.uid;
        this.angularFirestore.collection('users').add(user);
        result.user.sendEmailVerification();
      }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
  }
}
