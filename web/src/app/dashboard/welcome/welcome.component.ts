import {Component, OnInit} from '@angular/core';
import {WebUserService} from '../../../service/web-user.service';
import {DistrictDataStatisticsService} from '../../../../projects/lib/src/service/district-data-statistics.service';
import {Assert} from '@yunzhi/utils';
import {DistrictDataStatistics} from '../../../../projects/lib/src/entity/district-data-statistics';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {FormControl} from '@angular/forms';
import {District} from '../../../../projects/lib/src/entity/district';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  districtDataStatistics = {} as DistrictDataStatistics;
  districtIdFormControl = new FormControl();
  /**
   * 住房总数
   */
  houseCount = 0;
  /**
   * 居民总数
   */
  residentCount = 0;
  private readonly filePath = 'dashboard -> welcome';

  constructor(private userService: WebUserService,
              private districtService: DistrictService,
              private districtDataStatisticsService: DistrictDataStatisticsService) {
  }

  /**
   * 数据在1.2S 左右慢慢的加上去
   * @param begin 起始值
   * @param target 目标值
   * @param cb 回调
   */
  growUpSlowly(begin: number, target: number, cb: (count: number) => void) {
    if (begin < target) {
      setTimeout(() => {
        // 取步进，注意不能使用floor(),否则当target < 20时，会导致死循环
        begin += Math.ceil(target / 20);
        if (begin >= target) {
          begin = target;
        } else {
          this.growUpSlowly(begin, target, cb);
        }
        cb(begin);
      }, 60);
    } else {
      cb(target);
    }
  }

  load(districtId: number): void {
    this.districtDataStatisticsService.getByDistrictId(districtId)
      .subscribe(data => {
        this.setData(data);
      });

  }

  ngOnInit(): void {
    this.districtIdFormControl.valueChanges.subscribe(id => {
      this.load(id);
    });
    const user = this.userService.getCurrentUser();
    Assert.notNull(user, '仅支持存登录的情况下调用本组件');
    Assert.notNull(user.district, '未获取到用户区域');
    this.districtIdFormControl.setValue(user.district.id);
  }

  /**
   * 当类型不是building时，触发区域 ID 的变更
   * 原因：building是统计的最小单元，所以对building做统计没有意义。
   * @param district 区域
   */
  onDistrictChange(district: District) {
    Assert.isDefined(district.id, district.type, this.filePath + '区域校验失败');
    if (district.type !== 'building') {
      this.onDistrictIdChange(district.id);
    }
  }

  onDistrictIdChange($event: number) {
    this.districtIdFormControl.setValue($event);
  }

  setData(data: DistrictDataStatistics) {
    Assert.isDefined(data.district, '区域较验错误');
    this.districtDataStatistics = data;
    this.growUpSlowly(0, this.districtDataStatistics.houseCount, count => {
      this.houseCount = count;
    });

    this.growUpSlowly(0, data.residentCount, count => {
      this.residentCount = count;
    });
  }
}
