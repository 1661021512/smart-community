import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ActivatedRoute, Router} from "@angular/router";
import {getTestScheduler} from "jasmine-marbles";
import {forwardRef} from "@angular/core";
import {VillageSelectComponent} from "../../village/village-select/village-select.component";

describe('building->EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent, VillageSelectComponent],
      imports: [
        ReactiveFormsModule,
        ApiTestingModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  });
  beforeEach(() => {
    router = TestBed.inject(Router) as unknown as RouterStub;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: 1});
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});

