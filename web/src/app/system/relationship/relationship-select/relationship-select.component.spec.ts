import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RelationshipSelectComponent} from './relationship-select.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {HttpClientModule} from "@angular/common/http";
import {getTestScheduler} from "jasmine-marbles";

describe('RelationshipSelectComponent', () => {
  // 定义两个变量
  let component: RelationshipSelectComponent;
  let fixture: ComponentFixture<RelationshipSelectComponent>;

  beforeEach(async () => {
    // TestBed工作台，配置要测试的模块
    await TestBed.configureTestingModule({
      // 声明要上工作台的组件
      declarations: [RelationshipSelectComponent],
      // 配置测试的依赖，没有这些模块，测试就进行不了。
      imports: [
        ApiTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ]
    })
      .compileComponents(); // 配置完后，开始编译要测试组件
  });

  // 每次测试前，均执行一遍
  beforeEach(() => {
    // fix = 固定。用工作台创建一个供测试的组件。
    fixture = TestBed.createComponent(RelationshipSelectComponent);
    // 实例化要测试的组件
    component = fixture.componentInstance;
    // 检测变化
    fixture.detectChanges();
  });

  it('should create', () => {
    // 期待 组件 被成功创建
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('选传值，然后再获取到所有的居民关系', () => {
    component.writeValue(4);
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('先获取到所有的居民关系，再接收到的传值', () => {
    getTestScheduler().flush();
    component.writeValue(4);
    fixture.detectChanges();
  });
});
