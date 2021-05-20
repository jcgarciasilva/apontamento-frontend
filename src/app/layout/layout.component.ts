import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-layout',
  template: `
   <app-menu-nav [opened]="isOpen" [isAuthenticated]="displayMenu"  [user]="user">
  <router-outlet ></router-outlet>
</app-menu-nav>

  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'apontamento';
  private subs = new SubSink();
  isOpen: boolean;
  _displayMenu = false;

  user: User;

  constructor(
    public media: MediaObserver,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {

    if (this.authService.user$ === undefined) {
      console.log(`logging out`);
      console.log(this.authService.user$);
      console.log(this.authService.isLoggedIn$);
      this.authService.signOut();
    }

    this.authService.user$
      .subscribe(user => {
        this.user = user;
      });

    this.subs.sink = combineLatest([
      this.media.asObservable(),
    ])
      .pipe(
        tap(([mediaValue]) => {

          if (mediaValue[0].mqAlias === 'xs') {
            this.isOpen = false;
          } else {
            this.isOpen = true;
          }
        })
      )
      .subscribe();

  }

  get displayMenu() {
    return this._displayMenu;
  }


}
