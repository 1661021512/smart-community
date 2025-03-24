import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitsComponent} from './units.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {Unit} from '../../../../../projects/lib/src/entity/unit';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {UnitModule} from './unit/unit.module';
import {House_TYPE} from "../../../../../projects/lib/src/entity/enum/house-type";

describe('building => house => UnitComponent', () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitsComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        UnitModule,
        ApiTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;
    component.units = [{
      id: 3,
      name: '1单元',
      _maxFloor: 1,
      _houseCountPerFloor: 2,
      weight: 4,
      building: {
        houseType: House_TYPE.bungalow.value
      }
    } as Unit,
      {
        name: '2单元',
        _maxFloor: 1,
        _houseCountPerFloor: 2,
        weight: 4,
        building: {
          houseType: House_TYPE.bungalow.value
        }
      } as Unit]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
