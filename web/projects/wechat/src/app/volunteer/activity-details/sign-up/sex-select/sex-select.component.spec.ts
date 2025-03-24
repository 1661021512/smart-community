import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexSelectComponent } from './sex-select.component';
import {SexSelectModule} from './sex-select.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../../../../lib/src/api/api.testing.module';
import {IonicModule} from '@ionic/angular';

describe('SexSelectComponent', () => {
  let component: SexSelectComponent;
  let fixture: ComponentFixture<SexSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        SexSelectModule,
        RouterTestingModule,
        ApiTestingModule,
        IonicModule.forRoot(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
