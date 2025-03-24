import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailComponent} from './detail.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {DetailModule} from './detail.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        ApiTestingModule,
        DetailModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({id: '123'});
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    component.validate(component.propertyCompany);
  });
});
