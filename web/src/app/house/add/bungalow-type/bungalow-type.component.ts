import { Component, OnInit } from '@angular/core';
import {House_TYPE} from "../../../../../projects/lib/src/entity/enum/house-type";

@Component({
  selector: 'app-bungalow-type',
  templateUrl: './bungalow-type.component.html',
  styleUrls: ['./bungalow-type.component.scss']
})
export class BungalowTypeComponent implements OnInit {
  houseType = House_TYPE.bungalow.value;


  constructor() {
  }


  ngOnInit(): void {
    return;
  }

}
