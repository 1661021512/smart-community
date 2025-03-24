import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Volunteer} from "../../../../projects/lib/src/entity/volunteer";
import {EditOrSetWeightComponent} from './edit-or-set-weight.component';
import {EditOrSetWeightModule} from "./edit-or-set-weight.module";

describe('EditOrSetWeightComponent', () => {
  let component: EditOrSetWeightComponent;
  let fixture: ComponentFixture<EditOrSetWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrSetWeightModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrSetWeightComponent);
    component = fixture.componentInstance;
    component.volunteer = {} as Volunteer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
