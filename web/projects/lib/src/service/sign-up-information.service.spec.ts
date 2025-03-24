import { TestBed } from '@angular/core/testing';

import { SignUpInformationService } from './sign-up-information.service';
import {HttpClientModule} from '@angular/common/http';

describe('SignUpInformationService', () => {
  let service: SignUpInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(SignUpInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
