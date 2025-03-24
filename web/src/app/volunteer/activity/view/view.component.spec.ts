import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewComponent} from './view.component';
import {ViewModule} from './view.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute} from '@angular/router';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewComponent],
      imports: [ViewModule,
        RouterTestingModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    routeStub.paramsSubject.next({id: 123});
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
