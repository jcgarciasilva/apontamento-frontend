/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
