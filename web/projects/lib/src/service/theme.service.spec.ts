import {TestBed} from '@angular/core/testing';

import {ThemeService} from './theme.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
