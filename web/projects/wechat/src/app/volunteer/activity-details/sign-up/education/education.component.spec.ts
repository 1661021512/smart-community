import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EducationComponent} from './education.component';
import {EducationModule} from './education.module';
import {IonicModule} from '@ionic/angular';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationModule,
        IonicModule.forRoot(),
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
