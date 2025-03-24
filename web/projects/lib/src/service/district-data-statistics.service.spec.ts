import {TestBed} from '@angular/core/testing';

import {DistrictDataStatisticsService} from './district-data-statistics.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('DistrictDataStatisticsService', () => {
  let service: DistrictDataStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(DistrictDataStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
