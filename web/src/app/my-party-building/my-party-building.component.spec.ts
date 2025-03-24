import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyPartyBuildingComponent} from './my-party-building.component';
import {ApiTestingModule} from '../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {MyPartyBuildingModule} from './my-party-building.module';

describe('party-building->ShowComponent', () => {
  let component: MyPartyBuildingComponent;
  let fixture: ComponentFixture<MyPartyBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPartyBuildingModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPartyBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
