import {TestBed} from '@angular/core/testing';

import {ScheduledService} from './scheduled.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('ScheduledService', () => {
  let service: ScheduledService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(ScheduledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
