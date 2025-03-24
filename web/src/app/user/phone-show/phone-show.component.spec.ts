import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhoneShowComponent} from './phone-show.component';
import {getTestScheduler} from 'jasmine-marbles';
import {randomNumber} from '@yunzhi/utils';
import {User} from "../../../../projects/lib/src/entity/user";
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
    component.user = {
      id: randomNumber(),
      username: '139****0000'
    } as User;
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
