import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiVillageSelectComponent} from './multi-village-select.component';
import {MultiVillageSelectModule} from './multi-village-select.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Component, OnInit} from '@angular/core';

@Component({
  template: `
    <app-multi-village-select [setVillages]="villages"></app-multi-village-select>`
})
class TestComponent implements OnInit {
   villages = [
    {
      id: randomNumber(),
      name: randomString('小区'),
    } as Village,
    {
      id: randomNumber(),
      name: randomString('小区'),
    } as Village,
    {
      id: randomNumber(),
      name: randomString('小区'),
    } as Village] as Village[];

  ngOnInit(): void {
    return
  }
}

describe('property-company -> MultiVillageSelectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MultiVillageSelectModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiVillageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
