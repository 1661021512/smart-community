import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import {ViewModule} from "./view.module";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {HttpClientModule} from "@angular/common/http";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {SafeModule} from "../../share/pipe/safe/safe.module";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";

describe('notice->ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[
        ViewModule,
        RouterTestingModule,
        HttpClientModule,
        ApiTestingModule,
        SafeModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({id: '123'});
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
