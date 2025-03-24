import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import {EditModule} from "./edit.module";
import {ApiTestingModule} from "../../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[EditModule,
        // ApiTestingModule中引入了HttpClientModule，HttpClientModule中提供了HttpClient，
        // 这使得 EditComponent -> DutyService 中的HttpClient可用
        ApiTestingModule,
        // 路由器测试模块，设置用于测试的路由器。
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.loadById(5);
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
