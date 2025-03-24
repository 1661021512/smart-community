import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityWorkChartComponent } from './community-work-chart.component';

describe('CommunityWorkChartComponent', () => {
  let component: CommunityWorkChartComponent;
  let fixture: ComponentFixture<CommunityWorkChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityWorkChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityWorkChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
