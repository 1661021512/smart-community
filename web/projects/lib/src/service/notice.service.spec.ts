import {TestBed} from '@angular/core/testing';

import {NoticeService} from './notice.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('NoticeService', () => {
  let service: NoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(NoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
