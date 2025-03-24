import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResidentPipChartComponent} from './resident-pip-chart.component';

describe('ResidentPipChartComponent', () => {
  let component: ResidentPipChartComponent;
  let fixture: ComponentFixture<ResidentPipChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidentPipChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentPipChartComponent);
    component = fixture.componentInstance;
    // 设置宿主元素的宽度与高度
    const elementRef = fixture.debugElement;
    const htmlElement = elementRef.nativeElement as HTMLElement;
    htmlElement.style.width = '400px';
    htmlElement.style.height = '400px';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
