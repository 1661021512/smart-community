import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CurrentUserDistrictPostsSelectComponent} from './current-user-district-posts-select.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {WebUserService} from "../../../service/web-user.service";
import {UserStubService} from "../../../../projects/lib/src/service/user-stub.service";
import {User} from "../../../../projects/lib/src/entity/user";
import {County} from "../../../../projects/lib/src/entity/county";
import {randomNumber} from "@yunzhi/utils";
import {DISTRICT_TYPE, DistrictType} from "../../../../projects/lib/src/entity/enum/district-type";
import {DistrictService} from "../../../../projects/lib/src/service/district.service";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {getTestScheduler} from "jasmine-marbles";
import {Select2Module} from "../../share/select2/select2.module";

describe('CurrentUserDistrictPostsSelectComponent', () => {
  let component: CurrentUserDistrictPostsSelectComponent;
  let fixture: ComponentFixture<CurrentUserDistrictPostsSelectComponent>;
  let userStubService: UserStubService;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentUserDistrictPostsSelectComponent],
      imports: [HttpClientModule,
        RouterTestingModule,
        ApiTestingModule,
        ReactiveFormsModule,
        FormsModule,
        Select2Module
      ],
      providers: [{
        provide: WebUserService, useClass: UserStubService
      }, {
        provide: DistrictService, useClass: DistrictService
      }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserDistrictPostsSelectComponent);
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
    const types = DISTRICT_TYPE.village.value as DistrictType;
    component.writeValue(types);
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
