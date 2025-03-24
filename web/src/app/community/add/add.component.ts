import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Community} from '../../../../projects/lib/src/entity/community';
import {CommunityService} from '../../../../projects/lib/src/service/community.service';
import {Town} from '../../../../projects/lib/src/entity/town';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {YzAsyncValidators} from '../../../../projects/lib/src/validator/yz-async-validators';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';

/**
 * 社区添加
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
    townId: 'townId',
    geoJson: 'geoJson'
  };

  constructor(private communityService: CommunityService,
              private commonService: CommonService,
              private yzAsyncValidators: YzAsyncValidators) {
  }

  ngOnInit(): void {
    // 添加两个表单控制器进去，分别控制V层名称及拼音两个表单
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required,this.yzAsyncValidators.communityNameNotExist()));
    this.formGroup.addControl(this.formKeys.pinyin, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.townId, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.geoJson, new FormControl(null));
  }

  onSubmit(formGroup: FormGroup): void {
    const newCommunity = new Community({
      name: formGroup.get('name').value,
      pinyin: formGroup.get('pinyin').value,
      town: {
        id: formGroup.get('townId').value
      } as Town,
      geoJson: formGroup.get(this.formKeys.geoJson).value as Attachment
    });

    this.communityService.save(newCommunity)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      },
        error => console.log('保存失败', error));
  }
}
