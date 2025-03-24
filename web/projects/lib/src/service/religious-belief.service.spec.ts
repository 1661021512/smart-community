import {TestBed} from '@angular/core/testing';

import {ReligiousBeliefService} from './religious-belief.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('ReligiousBeliefService', () => {
  let service: ReligiousBeliefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(ReligiousBeliefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
