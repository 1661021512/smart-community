import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentStatusChartComponent } from './employment-status-chart.component';

describe('EmploymentStatusChartComponent', () => {
  let component: EmploymentStatusChartComponent;
  let fixture: ComponentFixture<EmploymentStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentStatusChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentStatusChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
