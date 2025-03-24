import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HouseComponent} from './house.component';
import {getTestScheduler} from 'jasmine-marbles';
import {EditComponent} from './edit/edit.component';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {UnitsModule} from './units/units.module';
import {DemoModule} from './demo/demo.module';
import {Building} from '../../../../projects/lib/src/entity/building';
import {House_TYPE} from "../../../../projects/lib/src/entity/enum/house-type";
import {Unit} from "../../../../projects/lib/src/entity/unit";

describe('building->HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HouseComponent,
        EditComponent
      ],
      imports: [
        RouterTestingModule,
        ApiTestingModule,
        DemoModule,
        UnitsModule,
        ReactiveFormsModule,
        ValidatorClassModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: '1'});
    expect(component).toBeTruthy();
  });

  it('save', () => {
    route.paramsSubject.next({id: '1'});
    getTestScheduler();
    fixture.detectChanges();
    component.onSubmit();
  });

  it('未生成过住房的新楼房', () => {
    component.setBuilding(new Building({
      id: 123,
      unitCount: 3,
      maxFloor: 3,
      housesLengthOfFloor: 2,
      name: '123',
      horizontalOffset: 123,
      verticalOffset: 234,
      units: [{
        id: 3,
        name: '1单元',
        _maxFloor: 1,
        _houseCountPerFloor: 2,
        weight: 4,
        building: {
          houseType: House_TYPE.building.value
        }
      } as Unit,
        {
          name: '2单元',
          _maxFloor: 1,
          _houseCountPerFloor: 2,
          weight: 4,
          building: {
            houseType: House_TYPE.building.value
          }
        } as Unit],
      houseType: House_TYPE.building.value
    }));
    getTestScheduler();
    fixture.detectChanges();
  })
  it('未生成过住房的新平房', () => {
    component.setBuilding(new Building({
      id: 123,
      unitCount: 3,
      maxFloor: 1,
      housesLengthOfFloor: 2,
      name: '123',
      horizontalOffset: 123,
      verticalOffset: 234,
      units: [],
      houseType: House_TYPE.bungalow.value
    }));
    getTestScheduler();
    fixture.detectChanges();
  })

  it('generateUnits', () => {
    route.paramsSubject.next({id: '1'});
    getTestScheduler().flush();

    const units = component.generateUnits(3, 4, 5);
    expect(units.length).toBe(3);
    expect(units[1].houses.length).toBe(20);

    component.building.units = units;
    fixture.detectChanges();
    getTestScheduler().flush();
  });

  afterEach((done) => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  });
});
