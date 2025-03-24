import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {View2dComponent} from './view2d.component';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {View2dModule} from './view2d.module';

describe('resident -> ViewBuildingComponent', () => {
  let component: View2dComponent;
  let fixture: ComponentFixture<View2dComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [View2dModule,
        RouterTestingModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    routeStub = TestBed.inject(ActivatedRoute) as undefined as ActivatedRouteStub;
    fixture = TestBed.createComponent(View2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    routeStub.paramsSubject.next({
      buildingId: '123'
    });
    getTestScheduler().flush();
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
  });
});
