import {Component, Input} from '@angular/core';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';

@Component({
  selector: 'app-phone-show',
  templateUrl: './phone-show.component.html',
  styleUrls: ['./phone-show.component.scss']
})
export class PhoneShowComponent {
  @Input()
  resident: Resident;
  public show = true;

  constructor(private residentService: ResidentService) {
  }

  /**
   * 获取手机号
   */
  getPhone(resident: Resident): void {
    if (resident && resident.id) {
      this.residentService.getById(resident.id)
        .subscribe(value => {
          Assert.isString(value.phone, 'phone must be string');
          resident.encodedPhone = value.phone;
          this.show = false;
        });
    }
  }
}
