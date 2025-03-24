import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityStatusSelectComponent} from './activity-status-select.component';
import {getTestScheduler} from 'jasmine-marbles';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivityStatusSelectModule} from './activity-status-select.module';

describe('ActivityStatusSelectComponent', () => {
  let component: ActivityStatusSelectComponent;
  let fixture: ComponentFixture<ActivityStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ActivityStatusSelectModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('状态选择');
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
