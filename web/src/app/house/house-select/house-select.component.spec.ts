import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseSelectComponent} from './house-select.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {Select2Module} from '../../share/select2/select2.module';

describe('house -> HouseSelectComponent', () => {
  let component: HouseSelectComponent;
  let fixture: ComponentFixture<HouseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseSelectComponent],
      imports: [
        ApiTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        Select2Module
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSelectComponent);
    component = fixture.componentInstance;
    component.writeValue(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('先传buildingId，再传FormControl值(传的值在列表范围内)', () => {
    component.writeValue(12);
    component.buildingId = 12;
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.formControl.value).toBe(12);
  });

  it('再传FormControl值,先传buildingId,最后清空', () => {
    component.buildingId = 12;
    getTestScheduler().flush();
    fixture.detectChanges();
    component.writeValue(12);
    fixture.detectChanges();
    component.writeValue(null);
    expect(component.formControl.value).toBe(null);
  });


  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  })
});
