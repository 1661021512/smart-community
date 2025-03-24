import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {HttpClientModule} from '@angular/common/http';
import {ApiTestingModule} from "../api/api.testing.module";
import { PartyBuildingService } from './party-building.service';

describe('PartBuildingService', () => {
  let service: PartyBuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });

    service = TestBed.inject(PartyBuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
