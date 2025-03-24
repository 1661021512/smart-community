import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseDetailComponent} from './house-detail.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {HouseDetailModule} from './house-detail.module';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Building} from '../../../../projects/lib/src/entity/building';
import {Unit} from '../../../../projects/lib/src/entity/unit';
import {House} from '../../../../projects/lib/src/entity/house';
import {randomBoolean, randomNumber, randomString} from '@yunzhi/utils';

describe('DetailComponent', () => {
  let component: HouseDetailComponent;
  let fixture: ComponentFixture<HouseDetailComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        ApiTestingModule,
        HouseDetailModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    component.house = {
      floor: randomNumber(),
      name: randomString('name'),
      weight: randomNumber(),
      type: randomNumber(1),
      area: randomNumber(100),
      lowIncoming: randomBoolean(),
      relief: randomBoolean(),
      checkInTime: randomNumber(),
      remarks: randomString('remark'),
      owner: {} as Resident,
      unit: {
        name: randomString('name'),
        building: {
          name: randomString('name'),
          village: {
            name: randomString('name')
          } as Village
        } as Building
      } as Unit
    } as House;
    fixture.detectChanges();
    console.log(component.house);
  });

  it('should create', () => {
    route.paramsSubject.next({id: 5});
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
  afterEach(done => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  })
});
