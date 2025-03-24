import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseAndResidentComponent} from './house-and-resident.component';
import {getTestScheduler} from 'jasmine-marbles';
import {HouseAndResidentModule} from './house-and-resident.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';

describe('dashboard -> HouseAndResidentComponent', () => {
  let component: HouseAndResidentComponent;
  let fixture: ComponentFixture<HouseAndResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseAndResidentModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAndResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
