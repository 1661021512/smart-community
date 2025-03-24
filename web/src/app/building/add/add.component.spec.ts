import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {AddComponent} from './add.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {AddModule} from './add.module';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AddModule,
        RouterTestingModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as unknown as RouterStub;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: 2});
    // 手动控制后台发送模拟数据
    getTestScheduler().flush();

    // 变更检测，重新渲染 V 层
    fixture.autoDetectChanges();
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
