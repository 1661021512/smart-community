import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Town} from '../../../../projects/lib/src/entity/town';
import {TownService} from '../../../../projects/lib/src/service/town.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {YzAsyncValidators} from '../../../../projects/lib/src/validator/yz-async-validators';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';

/**
 * 乡镇添加
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    pinyin: 'pinyin',
    geoJson: 'geoJson',
    secondaryGeoJson: 'secondaryGeoJson'
  };
  showUploader = false;

  constructor(private townService: TownService,
              private commonService: CommonService,
              private yzAsyncValidators: YzAsyncValidators) {
  }

  ngOnInit(): void {
    // 添加两个表单控制器进去，分别控制V层名称及拼音两个表单
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required, this.yzAsyncValidators.townNameNotExist()));
    this.formGroup.addControl(this.formKeys.pinyin, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.geoJson, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.secondaryGeoJson, new FormControl(null));
  }

  onSubmit(formGroup: FormGroup): void {
    const newTown = new Town({
      name: formGroup.get(this.formKeys.name).value as string,
      pinyin: formGroup.get(this.formKeys.pinyin).value as string,
      geoJson: formGroup.get(this.formKeys.geoJson).value as Attachment,
      secondaryGeoJson: formGroup.get(this.formKeys.secondaryGeoJson).value as Attachment
    });

    // 调用M层方法传入新乡镇信息对后台进行请求
    this.townService.save(newTown)
      .subscribe(
        () => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }
}
