import {TestBed} from '@angular/core/testing';

import {RelationshipService} from './relationship.service';

import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {HttpClientModule} from '@angular/common/http';

describe('RelationshipService', () => {
  let service: RelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(RelationshipService);
  });

  it('should be created', () => {
    expect([2, 3, 1, 4].sort((a, b) => a - b)[0]).toBe(1);
    expect(service).toBeTruthy();
  });
});
