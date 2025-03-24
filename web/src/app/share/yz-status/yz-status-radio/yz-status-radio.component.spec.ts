import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YzStatusRadioComponent} from './yz-status-radio.component';
import {YzStatusRadioModule} from './yz-status-radio.module';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EDUCATION_TYPE} from '../../../../../projects/lib/src/entity/enum/education-type';


@Component({
  template: `
    <yz-status-radio [types]="status"></yz-status-radio>
    <yz-status-radio [types]="status" [isShowPleaseSelect]="true"></yz-status-radio>
    <yz-status-radio [types]="status" [formControl]="formControl"></yz-status-radio>
    <yz-status-radio [types]="status" [formControl]="disabledFormControl"></yz-status-radio>
  `
})
class TestComponent {
  disabledFormControl = new FormControl({value: 0, disabled: true});
  formControl = new FormControl(0);
  status = EDUCATION_TYPE;
}

describe('YzStatusRadioComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [YzStatusRadioModule]
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
