import { TestBed } from '@angular/core/testing';

import { WelfareJobService } from './welfare-job.service';
import {ApiTestingModule} from '../api/api.testing.module'
import {RouterTestingModule} from '@yunzhi/ng-router-testing'
import {HttpClientModule} from '@angular/common/http'

describe('WelfareJobService', () => {
  let service: WelfareJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(WelfareJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
