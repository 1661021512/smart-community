import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaritalStatusSelectComponent} from './marital-status-select.component';
import {getTestScheduler} from 'jasmine-marbles';
import {MaritalStatusSelectModule} from './marital-status-select.module';

describe('resident -> MaritalStatusSelectComponent', () => {
  let component: MaritalStatusSelectComponent;
  let fixture: ComponentFixture<MaritalStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaritalStatusSelectModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaritalStatusSelectComponent);
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
