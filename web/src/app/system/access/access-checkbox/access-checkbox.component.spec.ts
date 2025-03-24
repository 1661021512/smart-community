import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCheckboxComponent } from './access-checkbox.component';

describe('AccessCheckboxComponent', () => {
  let component: AccessCheckboxComponent;
  let fixture: ComponentFixture<AccessCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
