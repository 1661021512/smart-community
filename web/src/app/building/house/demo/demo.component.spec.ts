import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoComponent} from './demo.component';
import {EditModule} from '../edit/edit.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {HttpClientModule} from '@angular/common/http';
import {Unit} from '../../../../../projects/lib/src/entity/unit';
import {randomNumber, randomString} from '@yunzhi/utils';
import {House} from '../../../../../projects/lib/src/entity/house';
import {ReactiveFormsModule} from '@angular/forms';
import {YzModalModule} from '@yunzhi/ng-common';


describe('house->DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoComponent],
      imports: [EditModule,
        YzModalModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('编辑住房', () => {
    component.onEdit({name: randomString('name'), id: 123} as House);
    fixture.detectChanges();
  });

  it('set sort', () => {
    // 遍历units给unit的weight赋值
    const units = new Array<Unit>();

    for (let i = 0; i < 3; i++) {
      units.push(new Unit({
        weight: randomNumber(),
        _maxFloor: randomNumber(),
        _houseCountPerFloor: randomNumber()
      }));

      // 模拟每层两个住户
      units.forEach(unit => {
        const houses = new Array<House>();
        const floorNumber = 5 + randomNumber(10);
        for (let i = 0; i < floorNumber; i++) {
          houses.push(
            {
              name: randomString(),
              floor: i,
              weight: randomNumber(20)
            } as House);
          houses.push(
            {
              name: randomString(),
              floor: i,
              weight: randomNumber(20)
            } as House);
        }
        unit.houses = houses;
      })
    }

    component.units = units;
  })

  afterEach(() => {
    fixture.autoDetectChanges();
  })
});
