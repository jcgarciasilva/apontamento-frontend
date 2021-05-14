import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UiService } from '../common/ui.service';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  user: User;

  constructor(protected authService: AuthService,
    protected router: Router,
    private uiService: UiService) {
    this.authService.user$.subscribe(
      authStatus => (this.user = authStatus)
    );

  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute);
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    let params: any;
    if (route) {
      const expectedRole = route.data.expectedRole;

      if (expectedRole) {
        roleMatch = this.user.role === expectedRole;
      }

      if (roleMatch) {
        params = { redirectUrl: route.pathFromRoot.map(r => r.url).join('/') };
      }
    }

    if (!this.user || !roleMatch) {
      this.showAlert(true, roleMatch);

      this.router.navigate(['login', params || {}]);
      return false;
    }

    return true;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }

    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource');
    }
  }



}
