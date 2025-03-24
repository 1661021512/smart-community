import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {AddModule} from './add.module';


describe('town->EditComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddModule,
        RouterTestingModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // 自动检测变更，很重要
    fixture.autoDetectChanges();
  });
});
