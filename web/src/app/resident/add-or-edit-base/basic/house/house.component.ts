import {Component, OnInit} from '@angular/core';
import {House} from '../../../../../../projects/lib/src/entity/house';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // this.formGroup.addControl(this.formKeys.houses, new FormControl(this.resident.houses, (control: AbstractControl) => {
    //   const houses = control.value as House[];
    //   let error = false;
    //   houses.forEach(house => {
    //     if (!error) {
    //       error = !Number.isInteger(house.id);
    //     }
    //   })
    //   return error ? {houses: '仍有未保存的houses'} : null;
    // }));
    return;
  }

  onAddHouseClick(house: House) {
    // this.houseService.getById(house.id).subscribe(value => {
    //   Assert.isNotNullOrUndefined(value.name, value.unit, value.village, '房屋校验失败');
    //   Assert.isNotNullOrUndefined(value.unit.name, value.unit.building, '房屋unit校验失败');
    //   Assert.isNotNullOrUndefined(value.unit.building.name, value.unit.building.village, '楼房信息校验失败');
    //   Assert.isNotNullOrUndefined(value.village.name, value.village.community, '小区校验失败');
    //   Assert.isNotNullOrUndefined(value.village.community.name, '社区名称校验失败');
    //   house.name = value.name;
    //   house.village = value.village;
    //   house.unit = value.unit;
    //   house._editable = false;
    // });
  }
  onRemoveHouse(i: number, houses: House[]) {
    // this.commonService.confirm(confirm => {
    //   if (confirm) {
    //     houses.splice(i, 1);
    //   }
    // }, '您确认要这么做吗？');
  }


  onAddHouse() {
    // this.resident.houses.push(new House({_editable: true}))
  }

}
