import {TestBed} from '@angular/core/testing';

import {ContentService} from './content.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
