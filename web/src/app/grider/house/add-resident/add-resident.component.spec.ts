import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddResidentComponent} from './add-resident.component';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {AddResidentModule} from './add-resident.module';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {By} from '@angular/platform-browser';
import {ResidentAddComponent} from '../../../resident/resident-add/resident-add.component';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';

describe('grider -> house -> AddResidentComponent', () => {
  let component: AddResidentComponent;
  let fixture: ComponentFixture<AddResidentComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResidentModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResidentComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    routeStub.paramsSubject.next({houseId: 123, residentId: 456});
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(ResidentAddComponent))).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
