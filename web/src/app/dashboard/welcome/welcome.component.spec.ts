import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {WelcomeModule} from './welcome.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeModule,ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
