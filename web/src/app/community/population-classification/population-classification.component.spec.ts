import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationClassificationComponent } from './population-classification.component';

describe('PopulationClassificationComponent', () => {
  let component: PopulationClassificationComponent;
  let fixture: ComponentFixture<PopulationClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
