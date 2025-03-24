import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GriderHouseAddComponent} from './grider-house-add.component';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../../../projects/lib/src/api/api.testing.module';
import {GriderHouseAddModule} from './grider-house-add.module';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';

describe('GriderHouseAddComponent', () => {
  let component: GriderHouseAddComponent;
  let fixture: ComponentFixture<GriderHouseAddComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GriderHouseAddModule,
        ApiTestingModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GriderHouseAddComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    routeStub.queryParamsSubject.next({griderId: '5'});
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
