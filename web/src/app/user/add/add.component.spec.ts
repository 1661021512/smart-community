import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddComponent} from './add.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {AddModule} from './add.module';
import {UserApi} from '../../../../projects/lib/src/api/user.api';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('user -> EditComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
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
    UserApi.currentLoginUser.district.id = 3;
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });

});
