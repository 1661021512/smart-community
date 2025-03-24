import {TestBed} from '@angular/core/testing';

import {ResidentRelationshipsService} from './resident-relationships.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('ResidentRelationshipsService', () => {
  let service: ResidentRelationshipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(ResidentRelationshipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
