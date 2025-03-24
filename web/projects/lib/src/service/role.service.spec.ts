import { TestBed } from '@angular/core/testing';

import {RoleService} from "./role.service";

import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {HttpClientModule} from "@angular/common/http";

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
