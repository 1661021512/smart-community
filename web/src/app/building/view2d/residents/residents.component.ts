import {Component, Input, OnInit} from '@angular/core';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {House} from '../../../../../projects/lib/src/entity/house';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {
  @Input()
  filter: (resident: Resident) => boolean;

  @Input()
  house: House;

  residents: Resident[];

  constructor() {
  }

  ngOnInit(): void {
    Assert.isDefined(this.house, '未传入房屋信息');
    this.residents = this.house.residents;
    Assert.isArray(this.residents, '传入的居民信息类型不是数组');
    this.validate(this.residents);
  }

  validate(residents: Resident[]) {
    residents.forEach(resident => {
      Assert.isTrue(typeof resident.sex === 'boolean', '性别类型错误');
    });
  }

  getClass(resident: Resident): string {
    if (this.filter && this.filter(resident)) {
      return 'text-primary';
    } else {
      return 'text-dark';
    }
  }

  getBd(residents: Resident[]): string {
    if (!this.filter) {
      return '';
    }

    let found = false;
    residents.forEach(resident => {
      if (!found) {
        found = this.filter(resident);
      }
    });

    return found ? 'bg-green' : '';
  }
}
