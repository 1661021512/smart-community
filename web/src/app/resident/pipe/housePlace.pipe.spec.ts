import {HousePlacePipe} from './housePlace.pipe';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {HousePlacePipeModule} from './housePlace-pipe.module';
import {getTestScheduler} from 'jasmine-marbles';
import {UserStubService} from '../../../../projects/lib/src/service/user-stub.service';
import {User} from '../../../../projects/lib/src/entity/user';
import {WebUserService} from '../../../service/web-user.service';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ReactiveFormsModule} from '@angular/forms';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {randomNumber} from '@yunzhi/utils';
import {House} from '../../../../projects/lib/src/entity/house';
import {Town} from '../../../../projects/lib/src/entity/town';
import {DistrictApi} from '../../../../projects/lib/src/api/district.api';

@Component({
  template: ''
})
class TestComponent {
}

describe('housePlacePipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let userStubService: UserStubService;
  let user = new User();
  let districtService: DistrictService;
  let housePlacePipe: HousePlacePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        ApiTestingModule,
        HousePlacePipeModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: WebUserService, useClass: UserStubService
        }
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    userStubService = TestBed.inject(WebUserService) as unknown as UserStubService;
    districtService = TestBed.inject(DistrictService) as unknown as DistrictService;
    housePlacePipe = new HousePlacePipe(userStubService, districtService);
    fixture.detectChanges();
  })

  it('组件集成测试', function () {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('当前用户为镇级用户，当前的房子位于该镇上，则由下级区域开始显示', done => {
    user.district = new Town(DistrictApi.getCounty().towns[0]);
    userStubService.nextCurrentLoginUser(user);
    housePlacePipe.transform(getHouse()).subscribe(result => {
      expect(result).toBe('社区 平安小区 一号楼 三单元 301');
      done();
    });
    getTestScheduler().flush();
  });

  it('当前用户为镇级用户，当前的房子并不位于该镇上, 则显示全称', done => {
    user.district = new Town(DistrictApi.getCounty().towns[1]);
    userStubService.nextCurrentLoginUser(user);
    housePlacePipe.transform(getHouse()).subscribe(result => {
      expect(result).toBe('乡镇 社区 平安小区 一号楼 三单元 301');
      done();
    });
    getTestScheduler().flush();
  });

  it('null 值测试', done => {
    housePlacePipe.transform(null).subscribe(result => {
      expect(result).toBe('-');
      done();
    });
  });
});

const getHouse = () => {
  return {
    id: randomNumber(),
    name: '301',
    unit: {
      name: '三单元',
      building: {
        name: '一号楼',
        id: DistrictApi.getCounty().towns[0].communities[0].villages[0].buildings[0].id,
        village: {
          name: '平安小区',
          community: {
            name: '社区',
            town: {
              name: '乡镇',
            }
          }
        }
      }
    }
  } as House;
}
