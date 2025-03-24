import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {IndexModule} from "./index.module";
import {IonicModule} from "@ionic/angular";
import {ApiTestingModule} from "../../../../../lib/src/api/api.testing.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('obtain-employment => ObtainIndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IndexModule,
        ApiTestingModule,
        RouterTestingModule,
        IonicModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
