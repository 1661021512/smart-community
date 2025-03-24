import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {EditModule} from "./edit.module";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";

describe('notice->EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[
        EditModule,
        RouterTestingModule,
        ApiTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: 123});
    getTestScheduler().flush();
    expect(component).toBeTruthy();
  });
});
