import {TestBed} from '@angular/core/testing';

import {EnterpriseService} from './enterprise.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('EnterpriseService', () => {
  let service: EnterpriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(EnterpriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
