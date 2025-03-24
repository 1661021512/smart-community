import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseComponent} from './house.component';
import {HouseModule} from './house.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute} from '@angular/router';

describe('grider -> house -> HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseModule,
        ApiTestingModule,
      RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    route.paramsSubject.next({page: 123});
    getTestScheduler().flush();
    expect(component.pageData.number).toBe(123);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
