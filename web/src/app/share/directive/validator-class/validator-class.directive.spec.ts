import {ValidatorClassDirective} from './validator-class.directive';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';

@Component({
  template: `<input appValidatorClass [formControl]="formControl" class="form-control">`
})
class TestComponent {
  formControl = new FormControl('', Validators.required);
}

describe('ValidatorClassDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, ValidatorClassDirective],
      imports: [
        CommonModule,
        ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', (done) => {
    fixture.autoDetectChanges();
    setTimeout(() => {
      // 初始化有is-required
      const htmlElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(htmlElement.className.includes('is-required')).toBeTruthy();

      // 给个值，则显示校验成功
      component.formControl.setValue('123');
      expect(htmlElement.className.includes('is-required')).toBeFalse();
      expect(htmlElement.className.includes('is-valid')).toBeTruthy();
      expect(htmlElement.className.includes('is-invalid')).toBeFalse();
      done();
    });
  });
});
