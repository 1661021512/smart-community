import {TestBed} from '@angular/core/testing';
import { ResidentService } from './resident.service';
import {ApiTestingModule} from "../api/api.testing.module";

describe('ResidentService', () => {
  let service: ResidentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(ResidentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
