import { ComponentFixture, TestBed } from '@angular/core/testing';

import {IonicModule} from "@ionic/angular";
import {VolunteerIndexModule} from "./volunteer-index.module";
import {VolunteerIndexComponent} from "./volunteer-index.component";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";
import {HttpClientModule} from '@angular/common/http';
import {ApiTestingModule} from '../../../../../lib/src/api/api.testing.module';

describe('IndexComponent', () => {
  let component: VolunteerIndexComponent;
  let fixture: ComponentFixture<VolunteerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        VolunteerIndexModule,
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientModule,
        ApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
