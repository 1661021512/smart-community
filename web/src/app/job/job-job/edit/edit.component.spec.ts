import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {EditModule} from './edit.module';
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {ActivatedRoute} from "@angular/router";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {getTestScheduler} from "jasmine-marbles";

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let routerStub: ActivatedRouteStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [EditModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    routerStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routerStub.paramsSubject.next({id: '123'});
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
