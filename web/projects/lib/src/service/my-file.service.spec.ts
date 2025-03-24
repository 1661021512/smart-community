import { TestBed } from '@angular/core/testing';

import { MyFileService } from './my-file.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('MyFileService', () => {
  let service: MyFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(MyFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
