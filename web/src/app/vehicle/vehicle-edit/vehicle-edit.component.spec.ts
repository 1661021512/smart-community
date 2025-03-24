import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEditComponent } from './vehicle-edit.component';
import {VehicleEditModule} from './vehicle-edit.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';

describe('vehicle -> VehicleEditComponent', () => {
  let component: VehicleEditComponent;
  let fixture: ComponentFixture<VehicleEditComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        VehicleEditModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEditComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({id: '123'});
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
