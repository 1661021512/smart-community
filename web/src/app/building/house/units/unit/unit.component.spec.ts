import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UnitComponent} from './unit.component';
import {ValidatorClassModule} from '../../../../share/directive/validator-class/validator-class.module';
import {ReactiveFormsModule} from '@angular/forms';
import {Building} from "../../../../../../projects/lib/src/entity/building";
import {Unit} from "../../../../../../projects/lib/src/entity/unit";
import {House_TYPE} from "../../../../../../projects/lib/src/entity/enum/house-type";
describe('building -> house -> units -> UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitComponent],
      imports: [
        ValidatorClassModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.unit = {
      id: 3,
      name: '1单元',
      _maxFloor: 2,
      _houseCountPerFloor: 2,
      weight: 4,
      building: {
        houseType: House_TYPE.building.value
      } as Building
    } as Unit
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });
});
