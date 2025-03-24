import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewComponent} from './view.component';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {By} from '@angular/platform-browser';
import {ResidentViewComponent} from '../../../resident/resident-view/resident-view.component';
import {ViewModule} from './view.module';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';

describe('grider -> resident -> ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let routeStub: ActivatedRouteStub;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
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
    expect(fixture.debugElement.query(By.directive(ResidentViewComponent))).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
