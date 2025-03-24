import {TestBed} from '@angular/core/testing';

import {JobTypeService} from './job-type.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('JobTypeService', () => {
  let service: JobTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(JobTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
