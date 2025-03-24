import {TestBed} from '@angular/core/testing';

import {CommonService} from './common.service';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
