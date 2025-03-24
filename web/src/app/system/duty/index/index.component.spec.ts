import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {IndexModule} from "./index.module";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        IndexModule,
        // ApiTestingModule中引入了HttpClientModule，HttpClientModule中提供了HttpClient，
        // 这使得 IndexComponent -> DutyService 中的HttpClient可用
        ApiTestingModule,
        // 路由器测试模块，设置用于测试的路由器。
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    // 获取ActivatedRoute后再强制转换为我们实际在RouterTestingModule中提供的ActivatedRouteStub
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
