import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerStarComponent } from './volunteer-star.component';
import {VolunteerModule} from '../volunteer.module';
import {IonicModule} from '@ionic/angular';
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ApiTestingModule} from '../../../../../lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';

describe('VolunteerStarComponent', () => {
  let component: VolunteerStarComponent;
  let fixture: ComponentFixture<VolunteerStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        VolunteerModule,
        RouterTestingModule,
        IonicModule.forRoot(),
        ApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });
});
