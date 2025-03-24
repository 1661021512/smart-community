import { ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import { MyActivityComponent } from './my-activity.component';
import { MyActivityModule } from './my-activity.module';

describe('MyActivityComponent', () => {
  let component: MyActivityComponent;
  let fixture: ComponentFixture<MyActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        MyActivityModule,
        IonicModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
