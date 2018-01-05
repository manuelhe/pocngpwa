import { TestBed, inject } from '@angular/core/testing';

import { FoxUserService } from './fox-user.service';

describe('FoxUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoxUserService]
    });
  });

  it('should ...', inject([FoxUserService], (service: FoxUserService) => {
    expect(service).toBeTruthy();
  }));
});
