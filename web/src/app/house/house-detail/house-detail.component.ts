import {Component, Input, OnInit} from '@angular/core';
import {Assert} from "@yunzhi/utils";
import {House} from "../../../../projects/lib/src/entity/house";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {
  @Input()
  house = {} as House;

  showMore = false;

  protected name = 'DetailComponent: ';

  constructor() { }

  ngOnInit(): void {
    this.validate(this.house);
  }

  validate(house: House) {
    Assert.isObject(house, this.name + 'house must be object');
    Assert.isDefined(
      house.unit,
      house.floor,
      house.name,
      house.weight,
      house.type,
      house.area,
      house.lowIncoming,
      house.relief,
      house.checkInTime,
      house.remarks,
      this.name + 'house validate fail');
    Assert.isDefined(house.unit.name, house.unit.building, this.name + 'house.unit validate fail');
    Assert.isDefined(house.unit.building.name, house.unit.building.village, this.name + 'house.unit.building validate fail');
    Assert.isDefined(house.unit.building.village.name, this.name + 'house.unit.building.village validate fail');
  };
}
