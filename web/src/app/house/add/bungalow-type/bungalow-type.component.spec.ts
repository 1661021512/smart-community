import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BungalowTypeComponent } from './bungalow-type.component';
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {BungalowTypeModule} from "./bungalow-type.module";
import {BuildingTypeModule} from "../building-type/building-type.module";

describe('BungalowTypeComponent', () => {
  let component: BungalowTypeComponent;
  let fixture: ComponentFixture<BungalowTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[BungalowTypeModule,
        ApiTestingModule,
        RouterTestingModule,
        BuildingTypeModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BungalowTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
