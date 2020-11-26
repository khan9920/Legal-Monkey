import { TestBed } from '@angular/core/testing';

import { SimplifyService } from './simplify.service';

describe('SimplifyService', () => {
  let service: SimplifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
