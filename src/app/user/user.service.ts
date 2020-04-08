import { Injectable } from '@angular/core';
import { User, IUser } from './user';
import { CacheService } from '../auth/cache.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAuthStatus, AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { transformError } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheService {
  currentUser = new BehaviorSubject<IUser>(this.getItem('user') || new User());
  private currentAuthStatus: IAuthStatus;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
    this.currentUser.subscribe(user => this.setItem('user', user));
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    );
  }

  getCurrentUser(): Observable<IUser> {
    const userObservable = this.getUser(this.currentAuthStatus.userId).pipe(
      catchError(transformError)
    );
    userObservable.subscribe(
      user => this.currentUser.next(user),
      err => Observable.throw(err)
    );
    return userObservable;
  }

  getUser(id): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.baseUrl}/v1/user/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    this.setItem('draft-user', user); // cache user data in case of errors
    const updateResponse = this.httpClient
      .put<IUser>(`${environment.baseUrl}/v1/user/${user.id || 0}`, user)
      .pipe(catchError(transformError));

    updateResponse.subscribe(
      res => {
        this.currentUser.next(res);
        this.removeItem('draft-user');
      },
      err => Observable.throw(err)
    );

    return updateResponse;
  }


}
