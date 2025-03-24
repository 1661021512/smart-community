import { PoliticalClimatePipe } from './political-climate.pipe';
import {randomNumber} from '@yunzhi/utils';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component({
  template: `<h1>{{1 | politicalClimate: true}}</h1>
  <h2 [innerHTML]="1 | politicalClimate"></h2>
  <h3 [innerHTML]="0 | politicalClimate"></h3>
  `
})
class TestComponent {
}


describe('PoliticalClimatePipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PoliticalClimatePipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
