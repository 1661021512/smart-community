import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {concat, Observable, of, Subject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {MultiSelectService} from './multi-select.service';
import {Assert} from '@yunzhi/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'yz-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => MultiSelectComponent)}
  ]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  /**接收做为FormControl使用时，父组件注册的变更方法*/
  controlChangeFn: (data: {id: number; name: string}[]) => void;
  /**数据列表*/
  items$: Observable<{id: number, name: string}[]>;
  /**加载中*/
  loading = false;
  /**服务*/
  @Input()
  multiSelectService: MultiSelectService;
  /**输入发生变化时，该subject发出数据*/
  searchKey$ = new Subject<string>();
  /**被选项*/
  selectedItems: {id: number, name: string}[] = [];

  constructor() {
  }

  /**
   * 当有新的输入时，调用后台的方法加载数据
   * 1. 接收到重复的数据时，不触发
   * 2. 设置500防抖，避免过多向后台发起请求
   * 3. 请求开始\结束，分别设置Loading
   * 4. 发起请求，并在发生错误时将选项至空
   * 5. 接收的值为空时，组装一个用户输入的备选项。
   */
  private loadItems() {
    this.items$ = concat(
      of([]), // default items
      this.searchKey$.pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => this.loading = true),
        switchMap(input => this.multiSelectService.findTopNameContains(input).pipe(
          catchError(() => {
            return of([]);
          }), // empty list on error
          tap(() => this.loading = false),
          map(items => items.length === 0 ? [{id: null, name: input}] : items)
        ))
      )
    );
  }

  ngOnInit() {
    Assert.isDefined(this.multiSelectService, '未注入对应的接口信息');
    this.loadItems();
  }

  /**
   * 根据ID来判断两个对象是否相等
   * @param item 列表中的对象
   */
  trackByFn(item: {id: number, name: string}) {
    return item.id;
  }

  /**
   * 发生变更时，过滤到重复信息; 最后向父组件弹值
   * @param $event 所有选中数据
   */
  onChange($event: {id: number, name: string}[]) {
    const ids = $event.map(value => value.id);
    const uniqueArray = $event.filter((value, index) => {
        return value.id === null || ids.indexOf(value.id, 0) === index;
      }
    );
    if (this.selectedItems.length > uniqueArray.length) {
      this.selectedItems = uniqueArray;
    }
    this.controlChangeFn([].concat(this.selectedItems));
  }

  /**
   * 用户点击添加时。
   * 如果是新的项，则触发后台的新建方法；
   * 否则触发更新最近使用时间方法
   * @param $event 选择项
   */
  onAdd($event: {id: number, name: string}) {
    if (Number.isInteger($event.id)) {
      this.multiSelectService.updateLastUsedTime($event.id);
    } else {
      this.multiSelectService.save($event.name.trim())
        .subscribe(value => {
          $event.id = value.id;
        })
    }
  }

  registerOnChange(fn: (data: {id: number, name: string}[]) => void): void {
    this.controlChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: {id: number, name: string}[]): void {
    this.selectedItems = obj;
  }
}
