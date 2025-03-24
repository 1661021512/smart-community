import { TestBed } from '@angular/core/testing';

import { UserDataStatisticsService } from './user-data-statistics.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('UserDataStatisticsService', () => {
  let service: UserDataStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(UserDataStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
