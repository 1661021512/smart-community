import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMultiSelectComponent } from './skill-multi-select.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {MultiSelectModule} from '../../share/component/multi-select/multi-select.module';

describe('SkillMultiSelectComponent', () => {
  let component: SkillMultiSelectComponent;
  let fixture: ComponentFixture<SkillMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillMultiSelectComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MultiSelectModule,
        ApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMultiSelectComponent);
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
