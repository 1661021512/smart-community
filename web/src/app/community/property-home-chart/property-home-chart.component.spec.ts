import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHomeChartComponent } from './property-home-chart.component';

describe('PropertyHomeChartComponent', () => {
  let component: PropertyHomeChartComponent;
  let fixture: ComponentFixture<PropertyHomeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyHomeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyHomeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
