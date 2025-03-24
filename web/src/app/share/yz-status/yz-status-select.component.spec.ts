import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YzStatusSelectComponent} from './yz-status-select.component';
import {StatusEnum} from '../../../../projects/lib/src/entity/enum/statusEnum';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  template: `
    <yz-status-select [types]="status"></yz-status-select>
    <yz-status-select [types]="status" [isShowPleaseSelect]="true"></yz-status-select>
    <yz-status-select [types]="status" [formControl]="formControl"></yz-status-select>
    <yz-status-select [types]="status" [formControl]="disabledFormControl"></yz-status-select>
  `
})
class TestComponent {
  disabledFormControl = new FormControl({value: 0, disabled: true});
  formControl = new FormControl(0);
  status = EDUCATION_TYPE;
}

describe('share -> YzStatusComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, YzStatusSelectComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});


type EducationType = 0 | 1 | 2 | 3;
const EDUCATION_TYPE: { [key: string]: StatusEnum<EducationType> } = {
  junior_high_school_and_below: {
    value: 0,
    description: '初中及以下',
    clazz: 'primary'
  },
  high_school: {
    value: 1,
    description: '高中',
  },
  college: {
    value: 2,
    description: '大学专科',
  },
  bachelor_degree_and_above: {
    value: 3,
    description: '大学本科及以上',
  },
};

