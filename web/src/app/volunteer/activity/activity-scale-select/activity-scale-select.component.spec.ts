import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityScaleSelectComponent} from './activity-scale-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivityScaleSelectModule} from './activity-scale-select.module';

describe('ActivityScaleSelectComponent', () => {
  let component: ActivityScaleSelectComponent;
  let fixture: ComponentFixture<ActivityScaleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ActivityScaleSelectModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityScaleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('规模选择');
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
