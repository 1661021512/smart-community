import {TestBed} from '@angular/core/testing';

import {VehicleService} from './vehicle.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
