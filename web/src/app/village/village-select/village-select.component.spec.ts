import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VillageSelectComponent} from './village-select.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {getTestScheduler} from "jasmine-marbles";
import {NgSelectModule} from '@ng-select/ng-select';
import {UserApi} from '../../../../projects/lib/src/api/user.api';
import {RouterTestingModule} from "@angular/router/testing";

describe('VillageSelectComponent', () => {
  let component: VillageSelectComponent;
  let fixture: ComponentFixture<VillageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillageSelectComponent],
      imports: [
        ApiTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageSelectComponent);
    component = fixture.componentInstance;
    UserApi.currentLoginUser.district = UserApi.districts[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('先传值，然后再获取到所有的小区', () => {
    component.writeValue(5);
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('先获取到所有的小区，再接收到的传值', () => {
    getTestScheduler().flush();
    component.writeValue(5);
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
