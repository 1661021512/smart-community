import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MobileReviewModule} from './mobile-review.module';
import {Component} from '@angular/core';
import {SafeModule} from '../../share/pipe/safe/safe.module';

@Component({
  template: `
    <app-mobile-review>
      <div [innerHTML]="innerHtml | safe"></div>
    </app-mobile-review>`
})
class TestComponent {
  innerHtml = '<h1>hello world</h1><p>Hello, my name is xxx</p>';
}

describe('mobile -> review -> ReviewComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MobileReviewModule,
        SafeModule]
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
  });
});
