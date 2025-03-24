import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {IndexModule} from './index.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {Resident} from '../../../../projects/lib/src/entity/resident';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [IndexModule,
        RouterTestingModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('batchEdit', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    const residents = [] as Resident[];
    for (let i = 0; i < 4; i++) {
      residents.push(new Resident())
    }
    component.onBatchEdit(residents);
    fixture.detectChanges();
  });

  afterEach(() => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
