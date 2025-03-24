import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {VillageShareModule} from '../../village/village-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import { BuildingTypePipe } from '../building-type.pipe';

describe('building->IndexComponent', () => {
  // 声明变量
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent, BuildingTypePipe],
      imports: [
        VillageShareModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ApiTestingModule,
        YzPageModule,
        YzSizeModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    // 获取ActivatedRoute后再强制转换为实际在RouterTestingModule中提供的ActivatedRouteStub
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    // 发送数据，触发C层的订阅方法
    route.paramsSubject.next({id: 4})
    route.queryParamsSubject.next({});
    expect(component).toBeTruthy();
    // 手动控制MockApi发送数据,消除发送数据的延迟
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
