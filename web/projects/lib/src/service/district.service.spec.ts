import {TestBed} from '@angular/core/testing';

import {DistrictService} from './district.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {DistrictApi} from '../api/district.api';
import {County} from '../entity/county';

describe('DistrictService', () => {
  let service: DistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule,
        RouterTestingModule]
    });
    service = TestBed.inject(DistrictService);
  });

  it('should be created', () => {
    getTestScheduler().flush();
    expect(service).toBeTruthy();
  });

  it('getDistrictOfCurrentUser', () => {
    const county = new County(DistrictApi.getCounty(2, 3, 4, 5));
    const totalCount = 1 + 2 + 2 * 3 + 2 * 3 * 4 + 2 * 3 * 4 * 5;

    // 查询出的区域与传入的区域ID相同
    for (let i = 1; i <= totalCount; i++) {
      expect(DistrictService.getByDistrictAndChildId(county, i).id).toBe(i);
    }
  });

  it('getChildrenWithItself', () => {
    const county = new County(DistrictApi.getCounty(2, 3, 4, 5));
    //expect(DistrictService.getChildrenWithItself(county, DISTRICT_TYPE.building.value).length).toBe(1 + 2 + 2 * 3 + 2 * 3 * 4 + 2 * 3 * 4 * 5);
    //expect(DistrictService.getChildrenWithItself(county.towns[0], DISTRICT_TYPE.building.value).length).toBe(1 + 3 + 3 * 4 + 3 * 4 * 5);
  });

});
