import { TestBed } from '@angular/core/testing';

import { METAService } from './meta.service';

describe('METAService', () => {
  let service: METAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(METAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
