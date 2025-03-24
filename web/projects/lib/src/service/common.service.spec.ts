import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CommonService} from './common.service';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule]
    });
    service = TestBed.inject(CommonService);
  });

  it('convertToDatetimeString', () => {
    expect(CommonService.convertToDatetimeString(null, 'yyyy-MM-dd')).toEqual('1970-01-01');
    expect(CommonService.convertToDatetimeString(new Date('2021-07-03').getTime(), 'yyyy-MM-dd'))
      .toEqual('2021-07-03');
  });
});
