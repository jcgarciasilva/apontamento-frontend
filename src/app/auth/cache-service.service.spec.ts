/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { CacheServiceService } from './cache.service';

describe('Service: CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheServiceService]
    });
  });

  it('should ...', inject([CacheServiceService], (service: CacheServiceService) => {
    expect(service).toBeTruthy();
  }));
});
