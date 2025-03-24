import {TestBed} from '@angular/core/testing';

import {AttachmentService} from './attachment.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpParams} from '@angular/common/http';

describe('AttachmentService', () => {
  let service: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('httpParams', () => {
    const httpParams = new HttpParams().append('hello', '123')
      .append('world', 456);
    console.log(httpParams.toString());
  });
});
