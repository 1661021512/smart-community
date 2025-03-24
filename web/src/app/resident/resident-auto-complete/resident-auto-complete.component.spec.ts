import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentAutoCompleteComponent } from './resident-auto-complete.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterTestingModule} from "@angular/router/testing";
import {UserApi} from "../../../../projects/lib/src/api/user.api";
import {getTestScheduler} from "jasmine-marbles";
import {Select2Module} from "../../share/select2/select2.module";
import {AutoCompleteModule} from "../../share/component/auto-complete/auto-complete.module";

describe('ResidentSelectComponent', () => {
  let component: ResidentAutoCompleteComponent;
  let fixture: ComponentFixture<ResidentAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentAutoCompleteComponent ],
      imports: [
        ApiTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        AutoCompleteModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentAutoCompleteComponent);
    component = fixture.componentInstance;
    UserApi.currentLoginUser.district = UserApi.districts[2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('当前登录用户为社区级', () => {
    expect(component).toBeTruthy();
    UserApi.currentLoginUser.district.id = 3;
    fixture.autoDetectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  });
});
