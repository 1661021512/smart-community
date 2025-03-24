import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {HttpClientModule} from '@angular/common/http'
import {CommunitySelectComponent} from "./community-select.component";
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('CommunitySelectComponent', () => {
  let component: CommunitySelectComponent;
  let fixture: ComponentFixture<CommunitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitySelectComponent ],
      imports:[
        ApiTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySelectComponent);
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

  it('选传值，然后再获取到所有的乡镇', () => {
    component.writeValue(4);
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('先获取到所有的乡镇，再接收到的传值', () => {
    getTestScheduler().flush();
    component.writeValue(4);
    fixture.detectChanges();
  });
});
