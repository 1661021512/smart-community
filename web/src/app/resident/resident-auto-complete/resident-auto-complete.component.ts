import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ResidentService} from "../../../../projects/lib/src/service/resident.service";
import {Resident} from "../../../../projects/lib/src/entity/resident";

@Component({
  selector: 'app-resident-auto-complete',
  templateUrl: 'resident-auto-complete.component.html',
  styleUrls: ['./resident-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return ResidentAutoCompleteComponent;
      })
    }
  ]
})
export class ResidentAutoCompleteComponent implements OnInit, ControlValueAccessor {
  @Output()
  doSearchKeyChange = new EventEmitter<string>();

  formControl = new FormControl(null);

  items = [] as {id: number, name: string}[];

  constructor(private residentService: ResidentService) {
  }

  writeValue(obj: {id: number, name: string}): void {
    this.formControl.setValue(obj);
  }

  registerOnChange(fn: (data: Resident) => void) {
    this.formControl.valueChanges
      .subscribe((data: Resident) => {
        fn(data);
      });
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
    this.formControl.setValue({id: null});
  }
  /**
   * 当输入的值变更时，请求后台返回数据
   * @param searchKey 输入值
   */
  onSearchKeyChange(searchKey: string) {
    this.items = [];
    this.residentService.page(0, 20, {name: searchKey})
      .subscribe(value => {
        this.items = value.content.map(v => {
          return {id: v.id, name: v.name + ' ' + v.phone}
        });
      })
  }

}
