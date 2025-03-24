import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreeComponent} from './three.component';

describe('ThreeModel -> IndexComponent', () => {
  let component: ThreeComponent;
  let fixture: ComponentFixture<ThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test', (done) => {
    expect(component).toBeTruthy();
    console.log('hello');
    done();
  });
});
