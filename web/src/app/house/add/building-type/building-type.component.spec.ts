import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BuildingTypeComponent} from './building-type.component';
import {getTestScheduler} from 'jasmine-marbles';
import {BuildingTypeModule} from './building-type.module';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('house -> add -> BuildingTypeComponent', () => {
  let component: BuildingTypeComponent;
  let fixture: ComponentFixture<BuildingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingTypeModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit', () => {
    component.formGroup.get(component.formKeys.unitId).setValue(123);
    getTestScheduler().flush();
    fixture.detectChanges();
    component.formGroup.get(component.formKeys.floor).setValue(1);
    component.formGroup.get(component.formKeys.name).setValue('hello');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
