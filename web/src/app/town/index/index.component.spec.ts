import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IndexComponent} from './index.component';
import {ReactiveFormsModule} from "@angular/forms";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';

// 单元测试的描述
describe('town -> IndexComponent', () => {
  // 声明变量
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  // 每个函数之前执行的函数
  beforeEach(async () => {

    // 单元测试模块配置即引用了哪些
    await TestBed.configureTestingModule({

      // 声明，此处为组建
      declarations: [IndexComponent],

      // 引入，此处为模块
      imports: [

        // 导出响应式表单所需的基础结构和指令，使它们可以由导入此模块的 NgModules 导入，
        // 提供了FormGroup和FormControl，使得我们可以随时检测到数据的变更。
        // 响应式表单是围绕 Observable 流构建的，表单的输入和值都是通过这些输入值组成的流来提供的，它可以同步访问。
        ReactiveFormsModule,

        // 路由器测试模块，设置用于测试的路由器。
        RouterTestingModule,

        // 引用了commonModule
        YzPageModule,

        // 引用了commonModule和FormsModule
        YzSizeModule,

        // ApiTestingModule中引入了HttpClientModule，HttpClientModule中提供了HttpClient，
        // 这使得 IndexComponet -> TownService 中的HttpClient可用
        ApiTestingModule
      ]
    })
      //  组建们编译
      .compileComponents();
  });

  // 每个函数执行之前执行
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

  it('town', () => {
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




