import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HouseComponent} from './house.component';
import {HouseModule} from "./house.module";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {ActivatedRoute} from "@angular/router";
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';


describe('HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HouseModule,
        RouterTestingModule,
        ApiTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
  });

  it('should create', () => {
    fixture.detectChanges();
    route.paramsSubject.next({griderId: 1234});
    getTestScheduler().flush();
    route.queryParamsSubject.next({page:1, size:10});
    fixture.detectChanges();
    getTestScheduler().flush();
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    getTestScheduler().flush();
  });
  afterEach(done => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  });
});
