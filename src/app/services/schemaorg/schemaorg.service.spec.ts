import { TestBed, inject } from '@angular/core/testing';

import { SchemaOrgService } from './schemaorg.service';

describe('SchemaOrgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchemaOrgService]
    });
  });

  it('should ...', inject([SchemaOrgService], (service: SchemaOrgService) => {
    expect(service).toBeTruthy();
  }));
});
