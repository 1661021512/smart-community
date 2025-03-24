import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportExcelListComponent } from './export-excel-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExportExcelListComponent', () => {
  let component: ExportExcelListComponent;
  let fixture: ComponentFixture<ExportExcelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportExcelListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportExcelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
