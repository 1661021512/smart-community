import { VillagePipe } from './village.pipe';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {getTestScheduler} from 'jasmine-marbles';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {House} from '../../../../projects/lib/src/entity/house';
import {UserStubService} from '../../../../projects/lib/src/service/user-stub.service';

@Component({
  template: '{{houses | village | async }}'
})
class TestComponent {
  houses = [
    {
      unit: {building: {village: {name: 'village1', community: {id: 1}}}}
    } as House,
    {
      unit: {building: {village: {name: 'village2',  community: {id: 2}}}}
    } as House
  ] as House[];
}

describe('vehicle->pipe->VillagePipe', () => {
  let userService: UserStubService
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let villagePipe: VillagePipe;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, VillagePipe],
      imports: [
        CommonModule,
        RouterTestingModule,
        ApiTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    villagePipe = new VillagePipe(userService);
    fixture.detectChanges();
  })
  it('create an instance', () => {
    expect(villagePipe).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
