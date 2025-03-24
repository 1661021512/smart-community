import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Community3dComponent} from './community3d.component';

describe('Community3dComponent', () => {
  let component: Community3dComponent;
  let fixture: ComponentFixture<Community3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Community3dComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Community3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
