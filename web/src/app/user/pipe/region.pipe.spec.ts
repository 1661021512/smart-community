import {RegionPipe} from './region.pipe';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UserStubService} from "../../../../projects/lib/src/service/user-stub.service";
import {User} from "../../../../projects/lib/src/entity/user";
import {DistrictService} from "../../../../projects/lib/src/service/district.service";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {WebUserService} from "../../../service/web-user.service";
import {getTestScheduler} from "jasmine-marbles";
import {DistrictApi} from "../../../../projects/lib/src/api/district.api";
import {Town} from "../../../../projects/lib/src/entity/town";

@Component({
  template: '{{ 5 | region | async }}'
})
class TestComponent {

}

describe('RegionPipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let userStubService: UserStubService;
  let user = new User();
  let districtService: DistrictService;
  let regionPipe: RegionPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, RegionPipe],
      imports: [
        CommonModule,
        RouterTestingModule,
        ApiTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: WebUserService, useClass: UserStubService
        }
      ]
    })
      .compileComponents();
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    userStubService = TestBed.inject(WebUserService) as unknown as UserStubService;
    districtService = TestBed.inject(DistrictService) as unknown as DistrictService;
    regionPipe = new RegionPipe(userStubService, districtService);
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

  it('当前用户为镇级用户，传入的regionId用户为楼', done => {
    user.district = new Town(DistrictApi.getCounty().towns[1]);
    userStubService.nextCurrentLoginUser(user);
    regionPipe.transform(20)
      .subscribe(data => {
          // data = 楼栋mdnz(随机生成,parent未定义)
          expect(data.length).toBe(6);
          done();
        }
      );
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('当前用户为镇级用户 , 传入的regionId用户为社区', done => {
    user.district = new Town(DistrictApi.getCounty().towns[1]);
    userStubService.nextCurrentLoginUser(user);
    regionPipe.transform(3)
      .subscribe(data => {
          // data = 社区nsix (随机生成)
          expect(data.length).toBe(6);
          done();
        }
      );
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });

});
