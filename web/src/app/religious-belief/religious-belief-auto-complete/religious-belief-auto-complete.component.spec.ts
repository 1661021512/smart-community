import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReligiousBeliefAutoCompleteComponent} from './religious-belief-auto-complete.component';
import {AutoCompleteModule} from '../../share/component/auto-complete/auto-complete.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';

describe('ReligiousBeliefAutoCompleteComponent', () => {
  let component: ReligiousBeliefAutoCompleteComponent;
  let fixture: ComponentFixture<ReligiousBeliefAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReligiousBeliefAutoCompleteComponent],
      imports: [
        AutoCompleteModule,
        ReactiveFormsModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligiousBeliefAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('自动填充', () => {
    component.formControl.setValue({name: '宗教信仰'});
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
