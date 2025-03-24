import {Component} from '@angular/core';
import {House_TYPE} from '../../../../projects/lib/src/entity/enum/house-type';

/**
 * 片区管理
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  houseType = House_TYPE.bungalow.value;

  constructor() {
  }
}
