import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HumanResourcesComponent} from './human-resources.component';
import {HumanResourcesModule} from './human-resources.module';
import {IonicModule} from '@ionic/angular';
import {ApiTestingModule} from '../../../../../lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('job ->  HumanResourceComponent', () => {
  let component: HumanResourcesComponent;
  let fixture: ComponentFixture<HumanResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HumanResourcesModule,
        IonicModule.forRoot(),
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
