import {FormControl} from '@angular/forms';
import {House} from '../entity/house';

/**
 * 房屋模型
 */
export class HouseModel {
  /**是否可编辑*/
  editable = false;
  formControl = new FormControl();
  /**房屋*/
  house: House;

  constructor(house: House, editable?: boolean, formControl?: FormControl) {
    this.house = house;
    this.editable = typeof editable === 'undefined' ? false : !!editable;
    this.formControl = formControl;

    if (formControl) {
      this.formControl = formControl;
    } else {
      this.formControl = new FormControl(this.house.id);
    }

    this.formControl.valueChanges.subscribe(id => {
      this.house = id;
    });
  }
}
