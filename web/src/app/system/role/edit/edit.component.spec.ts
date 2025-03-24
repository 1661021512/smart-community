import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {getTestScheduler} from "jasmine-marbles";

// @Author duangshuangyu
describe('role -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        ReactiveFormsModule,
        ApiTestingModule,
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // 手动触发loadById方法，模拟组件获取路由参数后的操作
    component.loadById(101);
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
