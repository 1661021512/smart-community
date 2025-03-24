import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {EditModule} from './edit.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {By} from '@angular/platform-browser';
import {ResidentEditComponent} from '../resident-edit/resident-edit.component';

describe('residnet -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.paramsSubject.next({id: 123});
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(ResidentEditComponent))).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
