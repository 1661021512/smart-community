import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMemberAddComponent } from './grid-member-add.component';

describe('GridMemberAddComponent', () => {
  let component: GridMemberAddComponent;
  let fixture: ComponentFixture<GridMemberAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridMemberAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
