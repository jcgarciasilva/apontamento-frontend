import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'apontamento';
  private subs = new SubSink();
  isOpen: boolean;

  constructor(
    public media: MediaObserver,
  ) { }

  ngOnInit(): void {

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
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }


}
