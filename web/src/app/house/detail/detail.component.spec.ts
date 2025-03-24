import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailComponent} from './detail.component';
import {DetailModule} from './detail.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {HouseDetailComponent} from '../house-detail/house-detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let routeStub: ActivatedRouteStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({id: '123'});
    getTestScheduler().flush();
    fixture.detectChanges();

    // 断言子组件渲染成功
    expect(fixture.debugElement.query(By.directive(HouseDetailComponent))).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
