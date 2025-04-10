import {TestBed} from '@angular/core/testing';

import {MenuService} from './menu.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
