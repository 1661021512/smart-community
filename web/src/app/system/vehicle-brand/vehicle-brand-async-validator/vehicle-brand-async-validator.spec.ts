import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {AddModule} from "../add/add.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {VehicleBrandAsyncValidator} from "./vehicle-brand-async-validator";
import {FormControl} from "@angular/forms";
import {getTestScheduler} from "jasmine-marbles";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('vehicle-brand -> vehicle-brand-async-validator', () => {
  let asyncValidate: VehicleBrandAsyncValidator;
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
    asyncValidate = TestBed.inject(VehicleBrandAsyncValidator);
  });
  it('should create an instance', fakeAsync( () => {
    expect(asyncValidate).toBeTruthy();
    let formControl = new FormControl('', [], asyncValidate.vehicleBrandNameNotExist());
    formControl.setValue('重复车辆品牌');
    // 等待防抖结束
    tick(1000);
    getTestScheduler().flush();
    expect(formControl.errors.vehicleBrandNameExist).toBeTrue();

    formControl.setValue('车辆品牌');
    tick(1000);
    getTestScheduler().flush();
    expect(formControl.errors).toBeNull();
  }));
});

