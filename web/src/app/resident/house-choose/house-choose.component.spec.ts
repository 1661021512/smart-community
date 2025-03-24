import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseChooseComponent} from './house-choose.component';
import {VillageShareModule} from '../../village/village-share.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {WebUserService} from '../../../service/web-user.service';
import {UserStubService} from '../../../../projects/lib/src/service/user-stub.service';
import {User} from '../../../../projects/lib/src/entity/user';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';
import {By} from '@angular/platform-browser';
import {VillageSelectComponent} from '../../village/village-select/village-select.component';
import {BuildingShareModule} from '../../building/building-share.module';
import {HouseShareModule} from '../../house/house-share.module';
import {BuildingSelectComponent} from '../../building/building-select/building-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {randomNumber} from '@yunzhi/utils';
import {County} from '../../../../projects/lib/src/entity/county';

describe('resident -> HouseChooseComponent', () => {
  let component: HouseChooseComponent;
  let fixture: ComponentFixture<HouseChooseComponent>;
  let userStubService: UserStubService;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseChooseComponent],
      imports: [VillageShareModule,
        RouterTestingModule,
        BuildingShareModule,
        ReactiveFormsModule,
        HouseShareModule,
        FormsModule,
        ApiTestingModule],
      providers: [
        {
          provide: WebUserService, useClass: UserStubService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseChooseComponent);
    component = fixture.componentInstance;
    userStubService = TestBed.inject(WebUserService) as unknown as UserStubService;
    // 初始化为县用户，显示所有选项
    user = new User({
      district: new County({id: randomNumber()})
    });
    userStubService.nextCurrentLoginUser(user);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('当前登录用户的区域类型为县、乡镇、社区时，显示小区选择组件', () => {
    const types = [DISTRICT_TYPE.county.value, DISTRICT_TYPE.town.value, DISTRICT_TYPE.community.value];
    types.forEach(value => {
      user.district = {...user.district, ...{type: value}};
      userStubService.nextCurrentLoginUser(user);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(VillageSelectComponent))).toBeTruthy();
    })
  });

  it('当前登录用户的区域类型为小区、楼房时，不显示小区选择组件', () => {
    const types = [DISTRICT_TYPE.village.value, DISTRICT_TYPE.building.value];
    types.forEach(value => {
      user.district = {...user.district, ...{type: value}};
      userStubService.nextCurrentLoginUser(user);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(VillageSelectComponent))).toBeNull();
    })
  });

  it('building选择组件是否显示', () => {
    user.district = {...user.district, ...{type: DISTRICT_TYPE.building.value}};
    userStubService.nextCurrentLoginUser(user);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(BuildingSelectComponent))).toBeNull();

    user.district = {...user.district, ...{type: DISTRICT_TYPE.community.value}};
    userStubService.nextCurrentLoginUser(user);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(BuildingSelectComponent))).toBeTruthy();
  });

  it('传入building值', () => {
    component.buildingFormControl.setValue(123);
    getTestScheduler().flush();
    fixture.detectChanges();
    component.formControl.valueChanges.subscribe(data => console.log(data));
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});

