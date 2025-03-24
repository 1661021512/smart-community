import {MaritalPipe} from './marital.pipe';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MaritalPipeModule} from './marital-pipe.module';

@Component({
  template: `
    <span [innerHTML]="0 | marital"></span>
    <span [innerHTML]="1 | marital"></span>
    <span [innerHTML]="2 | marital"></span>
    <span [innerHTML]="3 | marital"></span>
    `
})
class TestComponent {
}

describe('MaritalPipe', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MaritalPipeModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create ', () => {
    fixture.autoDetectChanges();
  });
});
