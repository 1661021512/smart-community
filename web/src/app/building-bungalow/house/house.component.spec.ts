import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseComponent} from './house.component';
import {HouseModule} from './house.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {FormControl, FormGroup} from '@angular/forms';
import {randomNumber} from '@yunzhi/utils';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';

describe('HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HouseModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

 it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({
      buildingId: 123
    });
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('onBatchGenerate', () => {
    routeStub.paramsSubject.next({
      buildingId: 123
    });
    getTestScheduler().flush();
    const formGroup = new FormGroup({});
    formGroup.addControl(component.keys.unitCount, new FormControl(randomNumber(10)));
    component.onBatchGenerate(formGroup);
    fixture.detectChanges();
    component.setBuilding(component.building);
  });

  afterEach(() => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
