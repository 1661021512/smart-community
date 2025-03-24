import {TestBed} from '@angular/core/testing';

import {AuthUserService} from './auth-user.service';
import {ApiTestingModule} from '../api/api.testing.module';

describe('AuthUserService', () => {
  let service: AuthUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(AuthUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
