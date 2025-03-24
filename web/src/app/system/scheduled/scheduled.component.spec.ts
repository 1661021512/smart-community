import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduledComponent} from './scheduled.component';
import {ScheduledModule} from './scheduled.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('system -> ScheduledComponent', () => {
  let component: ScheduledComponent;
  let fixture: ComponentFixture<ScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledModule,
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
