import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiSelectComponent} from './multi-select.component';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {Component, OnInit} from '@angular/core';
import {MultiSelectService} from './multi-select.service';
import {MultiSelectModule} from './multi-select.module';
import {of} from 'rxjs';
import {getTestScheduler} from 'jasmine-marbles';
import {delay} from 'rxjs/operators';
import {randomNumber, randomString} from '@yunzhi/utils';


@Component({
  template: `
    <yz-multi-select [formControl]="formControl" [multiSelectService]="multiSelectService"></yz-multi-select>`
})
class TestComponent implements OnInit {
  formControl = new FormControl([]);
  multiSelectService: MultiSelectService;

  ngOnInit(): void {
    this.multiSelectService = {
      findTopNameContains: (name) => {
        const result = [] as {id: number, name: string}[];
        for (let i = 0; i < 10; i++) {
          result.push({id: i + 1, name: randomString(name)})
        }
        return of(result).pipe(delay(500))
      },
      save: (name: string) => of({id: randomNumber(), name}).pipe(delay(500)),
      updateLastUsedTime: (id: number) => of<void>(null).pipe(delay(500))
    }

    this.formControl.valueChanges.subscribe(value => console.log('valuechange', value));
  }
}

describe('MultiSelectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ApiTestingModule,
        MultiSelectModule
      ]
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
  });
});
