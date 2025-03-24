import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleColourSelectComponent } from './vehicle-colour-select.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {VehicleColourSelectModule} from './vehicle-colour-select.module';

describe('vehicle -> VehicleColourSelectComponent', () => {
  let component: VehicleColourSelectComponent;
  let fixture: ComponentFixture<VehicleColourSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        VehicleColourSelectModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleColourSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
