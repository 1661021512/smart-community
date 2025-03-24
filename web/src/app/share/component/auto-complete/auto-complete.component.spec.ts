import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AutoCompleteComponent} from './auto-complete.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AutoCompleteModule} from './auto-complete.module';
import {getTestScheduler} from 'jasmine-marbles';
import {EnterpriseService} from '../../../../../projects/lib/src/service/enterprise.service';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';

@Component({
  template: `
    <yz-auto-complete [formControl]="formControl" [items]="items"
                      (doSearchKeyChange)="onSearchKeyChange($event)"></yz-auto-complete>`
})
class TestComponent implements OnInit {
  formControl = new FormControl();
  items = [] as {id: number, name: string}[];

  constructor(private enterpriseService: EnterpriseService) {
  }

  /**
   * 当输入的值变更时，请求后台返回数据
   * @param searchKey 输入值
   */
  onSearchKeyChange(searchKey: string) {
    this.enterpriseService.findTop20ByNameContains(searchKey)
      .subscribe(value => this.items = value)
  }

  ngOnInit(): void {
    this.formControl.setValue({id: 123, name: 'initer'})
  }
}

/**
 * 注意：由于模拟API有1秒左右的延迟，组件同时设置了500MS的防抖
 * 所以在查看组件效果是，会有个大约1.5秒的延时
 */
describe('AutoCompleteComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        AutocompleteLibModule,
        ReactiveFormsModule,
        FormsModule,
        AutoCompleteModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
