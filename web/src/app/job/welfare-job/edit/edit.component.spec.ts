import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditModule} from './edit.module';
import {EditComponent} from './edit.component';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing'
import {ActivatedRoute, Router} from '@angular/router'
import {getTestScheduler} from 'jasmine-marbles'
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditModule,
        ApiTestingModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as unknown as RouterStub;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: '1'});
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
