import { EducationPipe } from './education.pipe';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";

@Component({
  template: `<h1>{{1 | education: true}}</h1>
  <h2 [innerHTML]="0 | education"></h2>
  <h3 [innerHTML]="1 | education"></h3>
  <h3 [innerHTML]="2 | education"></h3>
  <h3 [innerHTML]="3 | education"></h3>`

})
class TestComponent {
}


describe('EducationPipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, EducationPipe]
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
