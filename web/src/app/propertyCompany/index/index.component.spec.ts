import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {IndexModule} from "./index.module";
import {ActivatedRoute} from "@angular/router";
import {getTestScheduler} from "jasmine-marbles";

describe('propertyCompany -> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        IndexModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
  });

  it('should create', () => {
    route.queryParamsSubject.next({name: 'name'});
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
