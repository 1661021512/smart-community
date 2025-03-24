import { Component, OnInit } from '@angular/core';
import {House_TYPE} from '../../../../projects/lib/src/entity/enum/house-type';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  houseType = House_TYPE.bungalow.value;

  constructor() { }

  ngOnInit(): void {
    return;
  }

}
