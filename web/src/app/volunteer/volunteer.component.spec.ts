import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerComponent } from './volunteer.component';
import {VolunteerModule} from "./volunteer.module";
import {ApiTestingModule} from "../../../projects/lib/src/api/api.testing.module";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ActivatedRoute} from "@angular/router";

describe('VolunteerComponent', () => {
  let component: VolunteerComponent;
  let fixture: ComponentFixture<VolunteerComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VolunteerModule,
        ApiTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    // 发送数据，触发 C 层的订阅方法
    route.queryParamsSubject.next({});
    // 判断实例化的组建component存在
    expect(component).toBeTruthy();
    // 手动控制MockApi发送数据，消除发送数据的延迟
    getTestScheduler().flush();
    // 自动检测变更
    fixture.autoDetectChanges();
  });
});
