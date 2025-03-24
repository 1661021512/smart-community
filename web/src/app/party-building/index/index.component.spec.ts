import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {IndexModule} from './index.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';

describe('partBuilding->IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        IndexModule,
        RouterTestingModule,
        ApiTestingModule,
        YzPageModule,
        YzSizeModule,
      ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture.detectChanges();
  });

  it('created', function () {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
