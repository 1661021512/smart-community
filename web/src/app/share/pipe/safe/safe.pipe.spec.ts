import { SafePipe } from './safe.pipe';

import { Component, } from '@angular/core';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {getTestScheduler} from "jasmine-marbles";

@Component({
  template: `
    <div [innerHtml]="htmlSnippet | safe: 'html'"></div>
  `,
})

export class TestComponent {

  htmlSnippet: string = "<p>content</p>";

  constructor() {}
}
describe('SafePipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent,SafePipe],
      imports: [
        CommonModule,
      ]
    })
      .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('create an instance', () => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
