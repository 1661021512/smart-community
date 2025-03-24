import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMemberAddStep1Component } from './grid-member-add-step1.component';

describe('GridMemberAddStep1Component', () => {
  let component: GridMemberAddStep1Component;
  let fixture: ComponentFixture<GridMemberAddStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridMemberAddStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMemberAddStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
