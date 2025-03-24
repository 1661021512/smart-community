import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import { ActivityStatePipe } from "./activity-state.pipe";

@Component({
  template: `<h1>{{1 | activityState: true}}</h1>
  <h2 [innerHTML]="0 | activityState"></h2>
  <h3 [innerHTML]="1 | activityState"></h3>
  <h3 [innerHTML]="2 | activityState"></h3>`
})

class TestComponent {
}

describe('ActivityStatePipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, ActivityStatePipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance',
    ()=>{
      expect(component).toBeTruthy();
      fixture.autoDetectChanges();
    });
});
