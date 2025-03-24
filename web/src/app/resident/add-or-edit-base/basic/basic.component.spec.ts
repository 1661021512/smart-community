import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicComponent} from './basic.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {By} from '@angular/platform-browser';
import {RelationshipSelectComponent} from '../../../system/relationship/relationship-select/relationship-select.component';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';
import {randomNumber} from '@yunzhi/utils';
import {ActivatedRoute} from '@angular/router';
import {BasicModule} from './basic.module';
import {ResidentAddModule} from '../../resident-add/resident-add.module';

describe('resident -> add -> BasicComponent', () => {
  let component: ResidentAddComponent;
  let fixture: ComponentFixture<ResidentAddComponent>;
  let basicComponent: BasicComponent;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidentAddComponent],
      imports: [
        ResidentAddModule,
        BasicModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentAddComponent);
    component = fixture.componentInstance;
    component.houseId = 123;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute) as undefined as ActivatedRouteStub;
    route.paramsSubject.next({houseId: randomNumber()})
    getTestScheduler().flush();
    component.activeIndex = 0;
    fixture.detectChanges();
    basicComponent = fixture.debugElement.query(By.directive(BasicComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('不显示与户主关系', () => {
    // 选择否
    component.formGroup.get(component.formKeys.isOwner).setValue(false);

    // 不存在居民ID及户主ID
    component.resident.id = null;
    basicComponent.state.house.owner.id = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(RelationshipSelectComponent))).toBeNull();

    // 存在居民ID, 不存在户主
    component.resident.id = 123;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(RelationshipSelectComponent))).toBeNull();

    // 存在居民ID，存在户主，当前居民即是户主
    basicComponent.state.house.owner.id = 123;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(RelationshipSelectComponent))).toBeNull();

    // 存在居民ID, 存在户主，居主ID就是户主
    basicComponent.state.house.owner.id = 123;
    component.resident.id = 123;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(RelationshipSelectComponent))).toBeNull();
    expect(basicComponent.relationshipSelectRef).toBeUndefined();

  });

  it('显示与户主关系', () => {
    // 不在居民ID, 存在户主，选择不是户主
    component.resident.id = null;
    basicComponent.state.house.owner.id = 123;
    component.formGroup.get(component.formKeys.isOwner).setValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(RelationshipSelectComponent))).toBeTruthy();

    // 存在居民ID，存在户主，选择居民不是户主
    component.resident.id = 4324;
    basicComponent.state.house.owner.id = 123;
    component.formGroup.get(component.formKeys.isOwner).setValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(RelationshipSelectComponent))).toBeTruthy();
    expect(basicComponent.relationshipSelectRef).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
