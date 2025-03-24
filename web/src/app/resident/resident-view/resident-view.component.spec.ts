import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResidentViewComponent} from './resident-view.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {randomString} from '@yunzhi/utils';
import {ResidentViewModule} from './resident-view.module';
import {ResidentApi} from '../../../../projects/lib/src/api/resident.api';

describe('resident -> redisentViewComponent', () => {
  let component: ResidentViewComponent;
  let fixture: ComponentFixture<ResidentViewComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentViewModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentViewComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.resident = ResidentApi.getByIdAndIdNumber(12, '123');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('流动人口', () => {
    component.resident = ResidentApi.getByIdAndIdNumber(12, '123');
    component.resident.beFloating = true;
    component.resident.floatedPlace = randomString('流动地点');
    component.resident.floatedDate = new Date().getTime();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
