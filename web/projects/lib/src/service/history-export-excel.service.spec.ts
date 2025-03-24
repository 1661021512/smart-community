import { TestBed } from '@angular/core/testing';

import { HistoryExportExcelService } from './history-export-excel.service';
import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";

describe('HistoryExportExcelService', () => {
  let service: HistoryExportExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(HistoryExportExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
