import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMemberComponent } from './grid-member.component';

describe('GridMemberComponent', () => {
  let component: GridMemberComponent;
  let fixture: ComponentFixture<GridMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
