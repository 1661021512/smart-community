import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BuildingSelectComponent} from './building-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {randomNumber} from '@yunzhi/utils';
import {VillageShareModule} from '../../village/village-share.module';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from "@angular/router/testing";

describe('BuildingSelectComponent', () => {
  let component: BuildingSelectComponent;
  let fixture: ComponentFixture<BuildingSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingSelectComponent],
      imports: [
        ReactiveFormsModule,
        ApiTestingModule,
        RouterTestingModule,
        VillageShareModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingSelectComponent);
    component = fixture.componentInstance;
    component.villageId = randomNumber();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('选中一个以及测试弹出', () => {
    getTestScheduler().flush();
    component.writeValue(3);
    component.registerOnChange((data) => console.log(data));
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
