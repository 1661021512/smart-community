import {Component} from '@angular/core';
import {ScheduledService} from '../../../../projects/lib/src/service/scheduled.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

@Component({
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss']
})
export class ScheduledComponent {
  private readonly message = '该操作将占用一定的数据库运算资源，请勿在用户使用期间操作';
  constructor(private scheduledService: ScheduledService,
              private commonService: CommonService) {
  }

  onClickClearYesterdayExcelFile() {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.scheduledService.clearYesterdayExcelFile()
          .subscribe(() => this.success());
      }
    }, this.message);
  }

  onUpdateEnterData() {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.scheduledService.updateEnterData()
          .subscribe(this.success);
      }
    }, this.message);
  }

  onReGenerateDistrictData() {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.scheduledService.reGenerateDistrictData()
          .subscribe(this.success);
      }
    }, this.message);
  }

  onReGenerateUserData() {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.scheduledService.reGenerateUserData()
          .subscribe(this.success);
      }
    }, this.message);
  }

  success() {
    this.commonService.success(() => {
    }, '数据运算需要一些时间，请稍后查看计算结果（请勿重复点击!）。')
  }
}
