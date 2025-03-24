import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitSelectComponent} from './unit-select.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {randomNumber} from '@yunzhi/utils';
import {getTestScheduler} from 'jasmine-marbles';
import {BuildingShareModule} from '../../building/building-share.module';

describe('UnitSelectComponent', () => {
  let component: UnitSelectComponent;
  let fixture: ComponentFixture<UnitSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitSelectComponent],
      imports: [
        ApiTestingModule,
        BuildingShareModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSelectComponent);
    component = fixture.componentInstance;
    // 模拟父组件传buildingId
    component.buildingId = randomNumber(20);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('父组件弹指测试',  () => {
    getTestScheduler().flush();
    component.writeValue(2);
    component.registerOnChange((data) => console.log(data));
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
