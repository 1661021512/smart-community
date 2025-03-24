import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {AddModule} from './add.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {By} from '@angular/platform-browser';
import {ResidentAddComponent} from '../resident-add/resident-add.component';

describe('resident -> add -> EditComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({houseId: 123});
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(ResidentAddComponent))).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
