import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VillageAddComponent} from './village-add.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {VillageAddModule} from './village-add.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('village->EditComponent', () => {
  let component: VillageAddComponent;
  let fixture: ComponentFixture<VillageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        VillageAddModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // 自动检测变更，很重要
    fixture.autoDetectChanges();
  });
});
