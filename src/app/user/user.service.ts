import { UiService } from './../common/ui.service';
import { Injectable } from '@angular/core';
import { User, IUser } from './user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as fbAdmin from 'firebase-admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private angularFirestore: AngularFirestore, private angularFirebaseAuth: AngularFireAuth, private uiService: UiService) { }

  getUser(uid: string) {
    return this.angularFirestore.collection<User>('users').doc(uid).get();
  }

  update(user: User) {
    const userRef = this.angularFirestore.collection<User>('users').doc(user.uid);
    userRef.set(JSON.parse(JSON.stringify(user)), { merge: true }).then(data => this.uiService.showToast('Dados salvos com sucesso'))
      .catch(error => this.uiService.showToast(error));
  }

  add(user: User) {

    // fbAdmin.auth().createUser({
    //   email: user.email,
    //   password: 'Oportuna2014'
    // }).then((result) => {
    //   user.uid = result.uid;
    //   console.log(result);
    //   console.log(user);
    //   this.angularFirestore.collection('users').doc(user.uid).set(JSON.parse(JSON.stringify(user))).then(() => {
    //     this.angularFirebaseAuth.sendSignInLinkToEmail(user.email, null)
    //       .catch(error => this.uiService.showToast(error));
    //     this.uiService.showToast('Dados salvos com sucesso');
    //   }).catch(error => this.uiService.showToast(error));
    // }).catch(
    //   (err) => {
    //     console.error(err);
    //     this.uiService.showToast(err);
    //   }
    // );
  }
}
