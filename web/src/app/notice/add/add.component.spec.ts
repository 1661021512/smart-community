import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {AddModule} from "./add.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ReactiveFormsModule} from "@angular/forms";

describe('notice->AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[
        AddModule,
        RouterTestingModule,
        ApiTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
