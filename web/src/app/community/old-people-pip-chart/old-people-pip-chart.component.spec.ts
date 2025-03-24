import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPeoplePipChartComponent } from './old-people-pip-chart.component';

describe('OldPeoplePipChartComponent', () => {
  let component: OldPeoplePipChartComponent;
  let fixture: ComponentFixture<OldPeoplePipChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldPeoplePipChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldPeoplePipChartComponent);
    component = fixture.componentInstance;
    // 设置宿主元素的宽度与高度
    const elementRef = fixture.debugElement;
    const htmlElement = elementRef.nativeElement as HTMLElement;
    htmlElement.style.width = '400px';
    htmlElement.style.height = '400px';
    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
