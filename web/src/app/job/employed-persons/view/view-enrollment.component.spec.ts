import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnrollmentComponent } from './view-enrollment.component';
import {ViewEnrollmentModule} from './view-enrollment.module';

describe('ViewEnrollmentComponent', () => {
  let component: ViewEnrollmentComponent;
  let fixture: ComponentFixture<ViewEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        ViewEnrollmentModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
