import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseEditComponent} from './house-edit.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {HouseEditModule} from './house-edit.module';
import {House} from '../../../../projects/lib/src/entity/house';
import {randomBoolean, randomNumber, randomString} from '@yunzhi/utils';

describe('EditComponent', () => {
  let component: HouseEditComponent;
  let fixture: ComponentFixture<HouseEditComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HouseEditModule,
        RouterTestingModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEditComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    component.house = {
      unit: {
        name: randomString(),
        building: {
          name: randomString(),
          village: {
            name: randomString()
          }
        }
      },
      floor: randomNumber(),
      name: randomString(),
      weight: randomNumber(),
      type: randomNumber(2),
      area: randomNumber(100),
      lowIncoming: randomBoolean(),
      relief: randomBoolean(),
      checkInTime: randomNumber(),
      remarks: randomString()
    } as House;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: 123});
    getTestScheduler().flush();
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
