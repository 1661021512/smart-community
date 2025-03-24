import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrueOrFalseComponent} from './true-or-false.component';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('share -> TrueOrFalseComponent', () => {
  let component: TrueOrFalseComponent;
  let fixture: ComponentFixture<TrueOrFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrueOrFalseComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueOrFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('测试输入后自动选中', () => {
    component.formControl.setValue(false);
    fixture.detectChanges();
    const radio = fixture.debugElement.query(By.css('#' + component.id + '_false')).nativeElement as HTMLInputElement;
    expect(radio).toBeTruthy();
    expect(radio.checked).toBeTruthy();
    fixture.autoDetectChanges();
  })
});
