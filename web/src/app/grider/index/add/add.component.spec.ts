import {ComponentFixture, TestBed} from '@angular/core/testing';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {AddModule} from './add.module';
import {AddComponent} from './add.component';
import {BehaviorSubject, Subject} from 'rxjs';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AddModule,
        RouterTestingModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('观察者模式', (done) => {
    const a = new Subject<number>();
    let called = false;
    a.asObservable().subscribe(value => called = true);
    expect(called).toBeFalse();
    a.next(123);
    expect(called).toBeTrue();

    const subject = new BehaviorSubject<number>(2);
    called = false;
    let temp = null as number;
    subject.asObservable().subscribe(value => {
      console.log('1', value);
      called = true;
      temp = value;
    });
    console.log('2');
    expect(called).toBeTrue();
    expect(temp).toBe(2);

    subject.next(43);
    expect(temp).toBe(43);

    subject.asObservable().subscribe(value => {
      expect(value).toBe(43);
      done();
    });
  });

  afterEach(() => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
