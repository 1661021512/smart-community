import {TestBed} from '@angular/core/testing';
import {WebUserService} from './web-user.service';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {HttpClientModule} from '@angular/common/http';
import {ApiTestingModule} from "../../projects/lib/src/api/api.testing.module";

describe('WebUserService', () => {
  let service: WebUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(WebUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
