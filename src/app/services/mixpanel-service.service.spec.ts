import { TestBed } from '@angular/core/testing';

import { MixpanelServiceService } from './mixpanel-service.service';

describe('MixpanelServiceService', () => {
  let service: MixpanelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixpanelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
