import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalClimateSelectComponent } from './political-climate-select.component';
import {getTestScheduler} from "jasmine-marbles";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('PoliticalClimateSelectComponent', () => {
  let component: PoliticalClimateSelectComponent;
  let fixture: ComponentFixture<PoliticalClimateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalClimateSelectComponent ]
      ,
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticalClimateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('1232');
    getTestScheduler().flush();
    fixture.detectChanges();
  });
});
