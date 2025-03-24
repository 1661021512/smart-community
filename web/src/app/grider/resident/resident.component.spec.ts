import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResidentComponent} from './resident.component';
import {ResidentModule} from './resident.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute} from '@angular/router';

describe('grider -> resident -> ResidentComponent', () => {
  let component: ResidentComponent;
  let fixture: ComponentFixture<ResidentComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute) as undefined as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();

    activatedRoute.paramsSubject.next({});

    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
