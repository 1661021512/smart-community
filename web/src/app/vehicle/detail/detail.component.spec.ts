import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailComponent} from './detail.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import { ActivatedRoute } from '@angular/router';
import {getTestScheduler} from "jasmine-marbles";
import {DetailModule} from "./detail.module";

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        ApiTestingModule,
        DetailModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('vehicle -> detail', () => {
    route.paramsSubject.next({id: 5});
    getTestScheduler().flush();
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    expect(component).toBeTruthy();
  });
});
