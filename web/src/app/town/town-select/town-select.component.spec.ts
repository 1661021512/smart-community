import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TownSelectComponent} from './town-select.component';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";

describe('TownSelectComponent', () => {
  let component: TownSelectComponent;
  let fixture: ComponentFixture<TownSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TownSelectComponent],
      imports: [
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
    fixture = TestBed.createComponent(TownSelectComponent);
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

  it('先传值，然后再获取到所有的乡镇', () => {
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
