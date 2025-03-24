import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {EditModule} from "./edit.module";
import {VehicleBrand} from "../../../../../projects/lib/src/entity/vehicle-brand";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";

describe('vehicle-brand -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditModule,
        ApiTestingModule],
    })
     .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    component.vehicleBrand = {} as VehicleBrand;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
