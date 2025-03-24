import { TestBed } from '@angular/core/testing';

import { VolunteerActivitySignUpService } from './volunteer-activity-sign-up.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('VolunteerActivitySignUpService', () => {
  let service: VolunteerActivitySignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(VolunteerActivitySignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
