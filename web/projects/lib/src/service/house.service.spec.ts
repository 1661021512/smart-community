import { TestBed } from '@angular/core/testing';
import {HouseService} from "./house.service";
import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {HttpClientModule} from "@angular/common/http";

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
