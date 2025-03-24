import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@angular/router/testing";
import { AddModule } from 'src/app/propertyCompany/add/add.module';

describe('property-company -> AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        AddModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
