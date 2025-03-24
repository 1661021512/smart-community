import {TestBed} from '@angular/core/testing';
import {ApiTestingModule} from '../api/api.testing.module';
import {CultService} from "./cult.service";

describe('CultService', () => {
  let service: CultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(CultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
