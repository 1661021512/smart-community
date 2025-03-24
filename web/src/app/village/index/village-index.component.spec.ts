import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VillageIndexComponent} from './village-index.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {CommunityModule} from '../../community/community.module';
import {CommunityShareModule} from '../../community/community-share.module';
import {TownShareModule} from '../../town/town-share.module';
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ReactiveFormsModule} from "@angular/forms";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {ActivatedRoute} from "@angular/router";
import {getTestScheduler} from "jasmine-marbles";
import { VillageTypePipe } from '../village-type.pipe';

describe('village -> IndexComponent', () => {
  let component: VillageIndexComponent;
  let fixture: ComponentFixture<VillageIndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillageIndexComponent, VillageTypePipe],
      imports: [
        HttpClientModule,
        ApiTestingModule,
        CommunityShareModule,
        TownShareModule,
        CommunityModule,
        ReactiveFormsModule,
        RouterTestingModule,
        YzPageModule,
        YzSizeModule,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageIndexComponent);
    component = fixture.componentInstance;
    // 获取ActivatedRoute后再强制转换为我们实际在RouterTestingModule中提供的ActivatedRouteStub
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    // 发送数据，触发 C 层的订阅方法
    route.paramsSubject.next({id: 4})
    route.queryParamsSubject.next({});
    // 判断实例化的组建component存在
    expect(component).toBeTruthy();

    // 手动控制MockApi发送数据，消除发送数据的延迟
    getTestScheduler().flush();

    // 自动检测变更
    fixture.autoDetectChanges();
  });
});
