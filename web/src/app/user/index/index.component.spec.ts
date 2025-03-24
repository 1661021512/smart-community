import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IndexComponent} from './index.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {UserStatusPipe} from '../user-status.pipe';


describe('user indexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent, UserStatusPipe],
      imports: [
        HttpClientTestingModule,
        // 导出响应式表单所需的基础结构和指令，使它们可以由导入此模块的 NgModules 导入，
        // 提供了FormGroup和FormControl，使得我们可以随时检测到数据的变更。
        // 响应式表单是围绕 Observable 流构建的，表单的输入和值都是通过这些输入值组成的流来提供的，它可以同步访问。
        ReactiveFormsModule,
        // 路由器测试模块，设置用于测试的路由器。
        RouterTestingModule,
        // 引用了commonModule
        YzPageModule,
        // // 引用了commonModule和FormsModule
        YzSizeModule,
        // // ApiTestingModule中引入了HttpClientModule，HttpClientModule中提供了HttpClient，
        // // 这使得 IndexComponet -> userService 中的HttpClient可用
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    // 将单元测试创建的IndexComponent组建赋值给fixture
    fixture = TestBed.createComponent(IndexComponent);

    // 将fixture的一个组建实例化并赋值给component
    component = fixture.componentInstance;

    // 获取ActivatedRoute后再强制转换为我们实际在RouterTestingModule中提供的ActivatedRouteStub
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;

    // 检测组建变化
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
