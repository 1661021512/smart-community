import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {EditorModule} from './editor.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../projects/lib/src/api/api.testing.module';
import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  template: `
    <app-editor [height]="200"
                [formControl]="formControl"></app-editor>`
})
class TestComponent implements OnInit {
  formControl = new FormControl('');

  ngOnInit(): void {
    this.formControl.setValue(`<h1>Hello</h1><p>I'm a yunzhi'er, welcome to join us!</p>`);
    this.formControl.valueChanges.subscribe(console.log);
  }
}

describe('EditorComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [EditorModule,
        ReactiveFormsModule,
        ApiTestingModule,
        RouterTestingModule]
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
