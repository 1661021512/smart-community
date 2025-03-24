import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidComponent } from './covid.component';
import {getTestScheduler} from "jasmine-marbles";
import {HttpClientModule} from "@angular/common/http";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";

describe('CovidComponent', () => {
  let component: CovidComponent;
  let fixture: ComponentFixture<CovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidComponent ],
      imports: [ApiTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
