import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShangyiComponent} from './shangyi.component';
import {ShangyiModule} from './shangyi.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('auth -> ShangyiComponent', () => {
  let component: ShangyiComponent;
  let fixture: ComponentFixture<ShangyiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShangyiModule, ApiTestingModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShangyiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
  });
});
