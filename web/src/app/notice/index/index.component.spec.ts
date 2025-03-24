import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {IndexModule} from "./index.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {HttpClientModule} from "@angular/common/http";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";

describe('notice->IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[
        IndexModule,
        ReactiveFormsModule,
        RouterTestingModule,
        YzPageModule,
        YzSizeModule,
        HttpClientModule,
        ApiTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    // 发送数据，触发 C 层的订阅方法
    route.queryParamsSubject.next({});

    expect(component).toBeTruthy();
    // 手动控制MockApi发送数据，消除发送数据的延迟
    getTestScheduler().flush();
    // 自动检测变更
    fixture.autoDetectChanges();
  });
});
