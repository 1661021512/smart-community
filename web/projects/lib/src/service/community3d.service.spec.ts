import {TestBed} from '@angular/core/testing';

import {Community3dService} from './community3d.service';
import {ApiTestingModule} from "../api/api.testing.module";

describe('Community3dService', () => {
  let service: Community3dService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(Community3dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
