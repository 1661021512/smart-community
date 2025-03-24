import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {House_TYPE} from '../../../../projects/lib/src/entity/enum/house-type';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  houseTypeFormControl = new FormControl(null);
  buildingType = House_TYPE.building.value;
  bungalowType = House_TYPE.bungalow.value;
}
