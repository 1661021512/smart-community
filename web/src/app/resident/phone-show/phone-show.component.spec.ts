import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhoneShowComponent} from './phone-show.component';
import {getTestScheduler} from 'jasmine-marbles';
import {randomNumber} from '@yunzhi/utils';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {PhoneShowModule} from './phone-show.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('PhoneShowComponent', () => {
  let component: PhoneShowComponent;
  let fixture: ComponentFixture<PhoneShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [PhoneShowModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.resident = {
      id: randomNumber(),
      phone: '138****1234'
    } as Resident;
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
