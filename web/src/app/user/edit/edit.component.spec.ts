import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {EditModule} from './edit.module';
import {UserApi} from '../../../../projects/lib/src/api/user.api';

describe('user -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditModule,
        RouterTestingModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    // 模拟县级用户
    UserApi.currentLoginUser.district.id = 1;
    route.paramsSubject.next({id: '3'});
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  afterEach(done => {
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  });
});
