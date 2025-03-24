import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentUserDistrictComponent} from './current-user-district.component';
import {ApiTestingModule} from "../../../../projects/lib/src/api/api.testing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {Component, OnInit} from "@angular/core";
import {getTestScheduler} from "jasmine-marbles";

@Component({
  template: `
    <app-current-user-district [sample]="true"></app-current-user-district>`
})
class TestComponent implements OnInit {

  ngOnInit(): void {
    return;
  }
}

describe('CurrentUserDistrictComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, CurrentUserDistrictComponent],
      imports: [
        ApiTestingModule,
        RouterTestingModule]
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
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
