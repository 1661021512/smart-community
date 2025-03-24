import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResidentEditComponent} from './resident-edit.component';
import {EditModule} from '../edit/edit.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {ResidentApi} from '../../../../projects/lib/src/api/resident.api';

describe('resident->ResidentEditComponent', () => {
  let component: ResidentEditComponent;
  let fixture: ComponentFixture<ResidentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentEditComponent);
    component = fixture.componentInstance;
    component.resident = ResidentApi.getByIdAndIdNumber(123, '123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
