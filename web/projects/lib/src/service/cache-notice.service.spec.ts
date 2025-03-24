import { TestBed } from '@angular/core/testing';

import { CacheNoticeService } from './cache-notice.service';

describe('CacheNoticeService', () => {
  let service: CacheNoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheNoticeService);
  });

  it('should be created', (done) => {
    let called = false;
    service.clear$.subscribe(() => {
      called = true;
    });
    service.clear$.subscribe(() => {
      done();
    });
    service.clear();
    expect(called).toBeTrue();
  });
});
