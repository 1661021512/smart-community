import {ComponentFixture, TestBed} from '@angular/core/testing';
import { NationalitySelectComponent } from './nationality-select.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NationalityPipe} from "../pipe/nationality.pipe";
import {NgSelectModule} from "@ng-select/ng-select";

describe('NationalitySelectComponent', () => {
  let component: NationalitySelectComponent;
  let fixture: ComponentFixture<NationalitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalitySelectComponent,
                      NationalityPipe],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

});
