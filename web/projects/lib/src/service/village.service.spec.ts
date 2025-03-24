import { TestBed } from '@angular/core/testing';

import { VillageService } from './village.service';
import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {HttpClientModule} from "@angular/common/http";
import {Village} from '../entity/village';
import {getTestScheduler} from 'jasmine-marbles';

describe('VillageService', () => {
  let service: VillageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(VillageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('all', () => {
    let villages: Village[];
    service.getAll().subscribe(data => villages = data);
    expect(villages).toBeUndefined();
    getTestScheduler().flush();
    expect(Array.isArray(villages)).toBeTrue();

    villages = undefined;
    service.getAll().subscribe(data => villages = data);
    expect(Array.isArray(villages)).toBeTrue();
  });
});
