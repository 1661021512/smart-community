import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {AddModule} from './add.module';


describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddModule,
        ApiTestingModule,
        RouterTestingModule
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
    // 初始值为null，保证V层的ngIf
    expect(component.houseTypeFormControl.value).toBeNull();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
