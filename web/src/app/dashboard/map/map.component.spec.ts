import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapModule} from './map.module';
import {Component} from '@angular/core';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';

@Component({
  template: `
      <app-map [districtId]="districtId" (beDistrictIdChange)="onChange($event)"></app-map>`
})
class TestComponent {
  /**
   * 尚义县的ID为1
   */
  districtId = 1;

  onChange($event: number) {
  }
}

describe('dashboard -> MapComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MapModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
