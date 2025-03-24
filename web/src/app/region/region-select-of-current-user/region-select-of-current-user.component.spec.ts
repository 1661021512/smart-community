import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegionSelectOfCurrentUserComponent} from './region-select-of-current-user.component';
import {RegionSelectOfCurrentUserModule} from './region-select-of-current-user.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {getTestScheduler} from 'jasmine-marbles';
import {UserApi} from '../../../../projects/lib/src/api/user.api';

describe('RegionSelectComponent', () => {
  let component: RegionSelectOfCurrentUserComponent;
  let fixture: ComponentFixture<RegionSelectOfCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RegionSelectOfCurrentUserModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionSelectOfCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('当前登录用户为县级', () => {
    UserApi.currentLoginUser.district.id = 1;
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
