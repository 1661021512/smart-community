import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {AddModule} from "./add.module";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AddModule,
        // ApiTestingModule中引入了HttpClientModule，HttpClientModule中提供了HttpClient，
        // 这使得 EditComponent -> DutyService 中的HttpClient可用
        ApiTestingModule,
        // 路由器测试模块，设置用于测试的路由器。
        RouterTestingModule,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
