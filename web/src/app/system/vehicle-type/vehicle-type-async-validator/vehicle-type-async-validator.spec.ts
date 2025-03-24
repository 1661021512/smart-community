import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {AddModule} from "../add/add.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {FormControl} from "@angular/forms";
import {getTestScheduler} from "jasmine-marbles";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {VehicleTypeAsyncValidator} from './vehicle-type-async-validator';


describe('vehicle-type -> vehicle-type -async-validator', () => {
  let asyncValidate: VehicleTypeAsyncValidator;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ApiTestingModule,
        AddModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
  });
  beforeEach(() => {
    asyncValidate = TestBed.inject(VehicleTypeAsyncValidator);
  });

  // fakeAsync 假异步 实际上是同步
  // tick（）模拟时间的异步流逝。
  it('should create an instance', fakeAsync( () => {
    expect(asyncValidate).toBeTruthy();
    let formControl = new FormControl('', [], asyncValidate.vehicleTypeNameIsAvailable());

    formControl.setValue('重复车辆类型');
    // 等待防抖结束
    tick(1000);
    getTestScheduler().flush();
    expect(formControl.errors.vehicleTypeNameNotAvailable).toBeTrue();

    formControl.setValue('车辆类型');
    tick(1000);
    getTestScheduler().flush();
    expect(formControl.errors).toBeNull()
  }))
});

