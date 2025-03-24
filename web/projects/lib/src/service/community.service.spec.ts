import { TestBed } from '@angular/core/testing';

import { CommunityService } from './community.service';
import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {HttpClientModule} from "@angular/common/http";

describe('CommunityService', () => {
  let service: CommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(CommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
