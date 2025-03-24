import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResidentAddComponent} from './resident-add.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {cold, getTestScheduler} from 'jasmine-marbles';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {of} from 'rxjs';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Enterprise} from '../../../../projects/lib/src/entity/enterprise';
import {AddModule} from '../add/add.module';
import {Cult} from '../../../../projects/lib/src/entity/cult';

describe('resident -> ResidentAddComponent', () => {
  let component: ResidentAddComponent;
  let fixture: ComponentFixture<ResidentAddComponent>;
  let router: ActivatedRouteStub;
  let residentService: ResidentService;
  let commonService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ApiTestingModule,
        RouterTestingModule,
        AddModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentAddComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    residentService = TestBed.inject(ResidentService);
    commonService = TestBed.inject(CommonService);
    component.houseId = 123;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.activeIndex = 0;
    getTestScheduler().flush();
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('就业情况', () => {
    component.activeIndex = 2;
    getTestScheduler().flush();
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('工作单位', () => {
    component.activeIndex = 2;
    component.resident.enterprise = {id: 123, name: '工作单位'} as Enterprise;
    getTestScheduler();
    fixture.detectChanges();
  });

  it('邪教', () => {
    component.activeIndex = 5;
    component.resident.cult = {id: 123, name: '邪教'} as Cult;
    getTestScheduler();
    fixture.detectChanges();
  });

  it('宗教信仰', () => {
    component.activeIndex = 5;
    component.resident = new Resident({
      religiousBelief: {id: 1, name: '宗教信仰'}
    });
    getTestScheduler();
    fixture.detectChanges();
  });

  it('onSubmit', () => {
    // 有ID时，执行更新操作
    spyOn(residentService, 'addHouseIfNotExist').and.returnValue(cold('--a--|', {a: null}));
    spyOn(residentService, 'update').and.returnValue(
      cold('--a--|', {a: null})
    );
    component.resident.id = 123;
    component.house.id = 123;
    component.submit().subscribe();
    expect(residentService.update).toHaveBeenCalled();
    getTestScheduler().flush();
    expect(residentService.addHouseIfNotExist).toHaveBeenCalled();

    // 无ID时，执行新建操作
    component.resident.id = null;
    spyOn(residentService, 'save').and.returnValue(
      of({id: 1} as Resident)
    );
    component.submit().subscribe();
    expect(residentService.save).toHaveBeenCalled();
    getTestScheduler().flush();
    expect(residentService.addHouseIfNotExist).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler();
  })
});
