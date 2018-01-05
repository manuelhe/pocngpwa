import { TestBed, inject } from '@angular/core/testing';

import { FoxEventService } from './fox-event.service';

describe('FoxEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoxEventService]
    });
  });

  it('should ...', inject([FoxEventService], (service: FoxEventService) => {
    expect(service).toBeTruthy();
  }));
});
