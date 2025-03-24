import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckboxesComponent} from './checkboxes.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    {{formControl.value | json}}
    <yz-checkboxes [formControl]="formControl" [list]="list" (doChange)="onChange($event)"></yz-checkboxes>`
})
class TestComponent implements OnInit {
  formControl = new FormControl([2, 4]);
  list = [
    {
      id: 0,
      name: '张三',
      sex: true,
    },
    {
      id: 1,
      name: '孙七',
      sex: true,
    },
    {
      id: 2,
      name: '李四',
      sex: true,
    },
    {
      id: 3,
      name: '王五',
      sex: true,
    },
    {
      id: 4,
      name: '赵六',
      sex: true,
    }
  ].map(value => {
    return {value: value.id, name: value.name}
  });

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(value => console.log(value));
  }

  onChange($event: number[]) {
    console.log($event);
  }
}


describe('share -> CheckboxesComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let checkboxesComponent: CheckboxesComponent<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, CheckboxesComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    checkboxesComponent = fixture.debugElement.query(By.directive(CheckboxesComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('click', () => {
    checkboxesComponent.writeValue([2, 3]);
    // 点一次
    checkboxesComponent.onChange(1, true);
    const value = component.formControl.value as any[];
    expect(value.length).toBe(3);

    // 再点一次
    checkboxesComponent.onChange(1, false);
    expect(value.length).toBe(2);
    expect(value.indexOf(1)).toBe(-1);
  })

  afterEach(() => {
    fixture.autoDetectChanges();
  });
});
