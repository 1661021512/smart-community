import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RelationshipMapComponent} from './relationship-map.component';
import {RelationshipMapModule} from './relationship-map.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';

describe('resident -> RelationshipMapComponent', () => {
  let component: RelationshipMapComponent;
  let fixture: ComponentFixture<RelationshipMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationshipMapModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.residentId = 123;
    getTestScheduler().flush();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
  })
});
