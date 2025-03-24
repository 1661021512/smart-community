import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseHouseComponent} from './choose-house.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ChooseHouseModule} from './choose-house.module';
import {PhoneShowModule} from '../../phone-show/phone-show.module';
import {IdNumberShowModule} from '../../id-number-show/id-number-show.module';

describe('resident -> add -> chooseHouse', () => {
  let component: ChooseHouseComponent;
  let fixture: ComponentFixture<ChooseHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ChooseHouseModule,
        ApiTestingModule,
        RouterTestingModule,
        PhoneShowModule,
        IdNumberShowModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('选择完house', () => {
    component.formGroup.get(component.formKeys.houseId).setValue(123);
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
