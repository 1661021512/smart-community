import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfareJobPostTypeSelectComponent } from './welfare-job-post-type-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {WelfareJobPostTypeSelectModule} from './welfare-job-post-type-select.module'
import {ActivityScaleSelectComponent} from '../../../volunteer/activity/activity-scale-select/activity-scale-select.component'
import {getTestScheduler} from 'jasmine-marbles'

describe('WelfareJobPostTypeSelectComponent', () => {
  let component: WelfareJobPostTypeSelectComponent;
  let fixture: ComponentFixture<WelfareJobPostTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        WelfareJobPostTypeSelectModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelfareJobPostTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('岗位类型选择');
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
