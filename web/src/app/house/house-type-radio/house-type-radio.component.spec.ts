import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseTypeRadioComponent} from './house-type-radio.component';
import {HouseTypeRadioModule} from './house-type-radio.module';

describe('HouseTypeRadioComponent', () => {
  let component: HouseTypeRadioComponent;
  let fixture: ComponentFixture<HouseTypeRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseTypeRadioModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseTypeRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
