import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {YzModalModule} from '@yunzhi/ng-common';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRoute, Router} from '@angular/router';
import {House} from '../../../../../projects/lib/src/entity/house';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Subject} from 'rxjs';

describe('building -> house -> EditComponent', () => {

  let component: EditComponent;

  let fixture: ComponentFixture<EditComponent>

  let route: ActivatedRouteStub;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [YzModalModule,
        ReactiveFormsModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as unknown as RouterStub;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    //单元测试
    component.house = {   //给House赋值
      name: randomString('name'), //name属性
      id: randomNumber() //id属性
    } as House;
    component.change$ = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  afterEach(() => {
  });
});

