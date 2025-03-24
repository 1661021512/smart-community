import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {AddComponent} from './add.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {AddModule} from './add.module';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
