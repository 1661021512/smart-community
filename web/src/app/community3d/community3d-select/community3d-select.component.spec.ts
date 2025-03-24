import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Community3dSelectComponent} from './community3d-select.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {getTestScheduler} from "jasmine-marbles";

describe('Community3dSelectComponent', () => {
  let component: Community3dSelectComponent;
  let fixture: ComponentFixture<Community3dSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Community3dSelectComponent],
      imports: [
        ApiTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Community3dSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('先传值，然后在获取到所有的社区3D模型', () => {
    component.writeValue(2);
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('先获取到所有的社区3D模型，再接收到的传值', () => {
    getTestScheduler().flush();
    component.writeValue(2);
    fixture.detectChanges();
  });
});
