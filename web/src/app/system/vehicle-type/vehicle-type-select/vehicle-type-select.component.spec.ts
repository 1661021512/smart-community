import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VehicleTypeSelectComponent} from './vehicle-type-select.component';
import {VehicleTypeSelectModule} from './vehicle-type-select.module';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';

describe('VehicleTypeSelectComponent', () => {
  let component: VehicleTypeSelectComponent;
  let fixture: ComponentFixture<VehicleTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        VehicleTypeSelectModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
