import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnterpriseAutoCompleteComponent} from './enterprise-auto-complete.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from '../../share/component/auto-complete/auto-complete.module';

describe('EnterpriseAutoCompleteComponent', () => {
  let component: EnterpriseAutoCompleteComponent;
  let fixture: ComponentFixture<EnterpriseAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterpriseAutoCompleteComponent],
      imports: [AutoCompleteModule,
        ReactiveFormsModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('init', () => {
    component.formControl.setValue({name: 'zhangsan'});
    getTestScheduler().flush();
    fixture.detectChanges();
  })

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
