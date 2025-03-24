import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CultAutoCompleteComponent} from './cult-auto-complete.component';
import {getTestScheduler} from 'jasmine-marbles';
import {CultAutoCompleteModule} from './cult-auto-complete.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {Component, OnInit} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  template: `
    {{formControl.value | json}}
    <app-cult-auto-complete [formControl]="formControl"></app-cult-auto-complete>`
})
class TestComponent implements OnInit {
  formControl = new FormControl();

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(value => console.log(value));
  }

}

describe('CultAutoCompleteComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent,CultAutoCompleteComponent],
      imports: [CultAutoCompleteModule,
        ApiTestingModule,
        RouterTestingModule,
        ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
