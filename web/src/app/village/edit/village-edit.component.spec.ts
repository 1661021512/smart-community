import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VillageEditComponent} from './village-edit.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {VillageEditModule} from './village-edit.module';

describe('village->EditComponent', () => {
  let component: VillageEditComponent;
  let fixture: ComponentFixture<VillageEditComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillageEditComponent],
      imports: [
        VillageEditModule,
        ApiTestingModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as unknown as RouterStub;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(VillageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: 1});
    // 手动控制后台发送模拟数据
    getTestScheduler().flush();

    // 变更检测，重新渲染 V 层
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  afterEach((done) => {
    // 触发尚未返回的数据并执行自动变更检测
    getTestScheduler().flush();
    fixture.autoDetectChanges();

    // 最终夹具稳定后，触发done方法，完成测试
    fixture.whenStable().then(() => done());
  });
});
