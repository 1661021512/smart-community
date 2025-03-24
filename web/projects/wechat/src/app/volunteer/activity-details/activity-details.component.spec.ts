import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailsComponent } from './activity-details.component';
import {IonicModule} from '@ionic/angular';
import {ActivityDetailsModule} from './activity-details.module';
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';

describe('ActivityDetailsComponent', () => {
  let component: ActivityDetailsComponent;
  let fixture: ComponentFixture<ActivityDetailsComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        ActivityDetailsModule,
        RouterTestingModule,
        IonicModule.forRoot(),
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailsComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
