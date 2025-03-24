import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IdNumberShowComponent} from './id-number-show.component';
import {getTestScheduler} from 'jasmine-marbles';
import {IdNumberShowModule} from './id-number-show.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {randomNumber} from '@yunzhi/utils';

describe('IdNumberShowComponent', () => {
  let component: IdNumberShowComponent;
  let fixture: ComponentFixture<IdNumberShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [IdNumberShowModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdNumberShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.resident = {
      id: randomNumber(),
      idNumber: '110101xxxxxxxx205X'
    } as Resident;
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
