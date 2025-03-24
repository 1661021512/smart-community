import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseOwnTypeRadioComponent} from './house-own-type-radio.component';
import {OwnedPipeModule} from '../pipe.module';
import {ReactiveFormsModule} from "@angular/forms";

describe('OwnedRadioComponent', () => {
  let component: HouseOwnTypeRadioComponent;
  let fixture: ComponentFixture<HouseOwnTypeRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseOwnTypeRadioComponent],
      imports: [OwnedPipeModule,
      ReactiveFormsModule]
    })

      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseOwnTypeRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
