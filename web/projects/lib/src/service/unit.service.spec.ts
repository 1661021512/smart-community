import { TestBed } from '@angular/core/testing';

import { UnitService } from './unit.service';
import {ApiTestingModule} from "../api/api.testing.module";

describe('UnitService', () => {
  let service: UnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(UnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
