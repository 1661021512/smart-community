import {Component, Input} from '@angular/core';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';

@Component({
  selector: 'app-id-number-show',
  templateUrl: './id-number-show.component.html',
  styleUrls: ['./id-number-show.component.scss']
})
export class IdNumberShowComponent {
  @Input()
  resident: Resident;
  public show = true;

  constructor(private residentService: ResidentService) {
  }

  /**
   * 获取身份证号码
   */
  getIdNumber(resident: Resident): void {
    this.residentService.getById(resident.id)
      .subscribe(value => {
        Assert.isString(value.idNumber, 'idNumber must be string');
        resident.encodedIdNumber = value.idNumber;
        this.show = false;
      });
  }
}
