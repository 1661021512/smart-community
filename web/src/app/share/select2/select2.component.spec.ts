import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Select2Component} from './select2.component';
import {Component} from '@angular/core';
import {Select2} from './select2';
import {randomString} from '@yunzhi/utils';
import {getTestScheduler} from 'jasmine-marbles';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  template: `
    {{formControl.value | json}}
    <yz-select2 [items]="items" [formControl]="formControl"></yz-select2>`
})
class TestComponent {
  formControl = new FormControl();
  items = [] as Select2<number, any>[];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.items.push(new Select2<number, any>({
        id: i + 1,
        label: i + randomString('label'),
        option: i + randomString('name'),
      }))
    }
  }
}

describe('share -> select2 -> Select2Component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Select2Component, TestComponent],
      imports: [
        NgSelectModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('测试自动选中', () => {
    testComponent.formControl.setValue(2);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler();
  })
});
