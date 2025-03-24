import { TestBed } from '@angular/core/testing';
import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import { GriderService } from './grider.service';

describe('GriderService', () => {
  let service: GriderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]});
    service = TestBed.inject(GriderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
