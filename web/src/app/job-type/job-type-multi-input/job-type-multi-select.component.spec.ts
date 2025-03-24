import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JobTypeMultiSelectComponent} from './job-type-multi-select.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {MultiSelectModule} from '../../share/component/multi-select/multi-select.module';

describe('JobMultiInputComponent', () => {
  let component: JobTypeMultiSelectComponent;
  let fixture: ComponentFixture<JobTypeMultiSelectComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [JobTypeMultiSelectComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MultiSelectModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTypeMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler();
  })
});
