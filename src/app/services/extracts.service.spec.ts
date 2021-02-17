import { TestBed } from '@angular/core/testing';

import { ExtractsService } from './extracts.service';

describe('ExtractsService', () => {
  let service: ExtractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
