import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RoleCheckboxComponent} from "./role-checkbox.component";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {getTestScheduler} from "jasmine-marbles";

@Component({
  template: `
    <app-role-checkbox [formControl]="formControl" (doChange)="onChange($event)"></app-role-checkbox>`
})
class TestComponent implements OnInit {
  formControl = new FormControl([]);

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(value => console.log(value));
  }

  onChange($event: number[]) {
    console.log($event);
  }
}


describe('role-checkbox', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let checkboxesComponent: RoleCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, RoleCheckboxComponent],
      imports: [
        ReactiveFormsModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    checkboxesComponent = fixture.debugElement.query(By.directive(RoleCheckboxComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('click', () => {
    checkboxesComponent.writeValue([0, 1]);
    // 点一次
    checkboxesComponent.onChange(2, true);
    const value = component.formControl.value as any[];
    expect(value.length).toBe(3);

    // 再点一次
    checkboxesComponent.onChange(2, false);
    expect(value.length).toBe(2);
  })

  afterEach(() => {
    fixture.autoDetectChanges();
  });
});
