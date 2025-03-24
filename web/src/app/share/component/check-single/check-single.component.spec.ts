import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckSingleComponent} from './check-single.component';
import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Checkbox} from '../../../../../projects/lib/src/modal/checkbox';
import {RouterTestingModule} from '@angular/router/testing';
import {CheckSingleModule} from './check-single.module';
import {CheckAllModule} from '../check-all/check-all.module';
import {Subject} from 'rxjs';
import {CheckAllComponent} from '../check-all/check-all.component';
import {By} from '@angular/platform-browser';
import {randomNumber} from '@yunzhi/utils';


@Component({
  template: `
      <tr>
          <td>
              全选
              <app-check-all [singleCheckboxChange$]="singleChange$" [checkboxes]="items"
                             (beChange)="onAllChange($event)"></app-check-all>
          </td>
      </tr>
      <tr *ngFor="let object of items">
          <td>
              <app-check-single [checked]="object._checked"
                                (beChange)="onSingleChange($event, object)"></app-check-single>
          </td>
      </tr> `
})
class TestComponent implements OnInit {
  items = [{_checked: true}, {_checked: false}, {_checked: true}]
  /**
   * 当选择某一个组件变化时，通过subject弹出一个值，
   * 全部选择组件监听subject值变化，发生变化后重新加载
   */
  singleChangeSubject = new Subject<void>();
  singleChange$ = this.singleChangeSubject.asObservable();

  ngOnInit(): void {
    return;
  }

  /**
   * 接收选择一个组件传值
   * @param $event
   * @param object
   */
  onSingleChange($event: boolean, object: Checkbox) {
    object._checked = $event;
    this.singleChangeSubject.next(null);
  }

  /**
   * 接收选择全部组件传值
   * @param $event
   */
  onAllChange($event: Checkbox[]) {
    this.items = $event;
    console.log('all', this.items);
  }
}

describe('CheckSingleComponent', () => {
  let component: TestComponent;
  let checkAllComponent: CheckAllComponent;
  let checkSingleComponents: CheckSingleComponent[];
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        CheckSingleModule,
        CheckAllModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    checkAllComponent = fixture.debugElement.query(By.directive(CheckAllComponent)).componentInstance;

    fixture.detectChanges();

    checkSingleComponents = fixture.debugElement.queryAll(By.directive(CheckSingleComponent))
      .map(debugElement => debugElement.componentInstance);
    expect(checkAllComponent instanceof CheckAllComponent).toBeTrue();
    expect(Array.isArray(checkSingleComponents)).toBeTrue();
    expect(checkSingleComponents.length).toBeGreaterThan(0);
    checkSingleComponents.forEach(value => expect(value instanceof CheckSingleComponent).toBeTrue());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('checkAll', () => {
    checkAllComponent.formControl.setValue(true);
    fixture.detectChanges();
    checkSingleComponents.forEach(value => expect(value.formControl.value).toBeTruthy());

    checkAllComponent.formControl.setValue(false);
    fixture.detectChanges();
    checkSingleComponents.forEach(value => expect(value.formControl.value).toBeFalse());
  });

  it('singleCheck', () => {
    checkAllComponent.formControl.setValue(true);
    fixture.detectChanges();
    checkSingleComponents[randomNumber(checkSingleComponents.length)].formControl.setValue(false);
    fixture.detectChanges();
    expect(checkAllComponent.formControl.value).toBeFalse();

    checkAllComponent.formControl.setValue(true);
    expect(checkAllComponent.formControl.value).toBeTruthy();
    fixture.detectChanges();
  });
});
