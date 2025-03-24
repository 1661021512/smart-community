import {TestBed} from '@angular/core/testing';

import {TownService} from './town.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from "@angular/router/testing";

describe('TownService', () => {
  let service: TownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(TownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
