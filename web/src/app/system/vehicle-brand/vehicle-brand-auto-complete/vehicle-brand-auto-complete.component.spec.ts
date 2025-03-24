import {ComponentFixture, TestBed} from '@angular/core/testing';
import {VehicleBrandAutoCompleteComponent} from './vehicle-brand-auto-complete.component';
import {VehicleBrandAutoCompleteModule} from "./vehicle-brand-auto-complete.module";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {getTestScheduler} from "jasmine-marbles";
import { Observable } from 'rxjs';

describe('VehicleBrandAutoCompleteComponent', () => {
  let component: VehicleBrandAutoCompleteComponent;
  let fixture: ComponentFixture<VehicleBrandAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleBrandAutoCompleteComponent],
      imports: [
        VehicleBrandAutoCompleteModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBrandAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();
  });
});
