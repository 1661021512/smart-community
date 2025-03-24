import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAddComponent } from './vehicle-add.component';
import {RouterTestingModule} from "@angular/router/testing";
import {VehicleAddModule} from './vehicle-add.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';

describe('vehicle -> VehicleAddComponent', () => {
  let component: VehicleAddComponent;
  let fixture: ComponentFixture<VehicleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        VehicleAddModule,
        ApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
