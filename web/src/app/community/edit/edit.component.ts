import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CommunityService} from '../../../../projects/lib/src/service/community.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {Community} from '../../../../projects/lib/src/entity/community';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Town} from '../../../../projects/lib/src/entity/town';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';

/**
 * 社区编辑
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  community: Community;
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
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.pinyin, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.townId, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.geoJson, new FormControl(null));
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(id);
    });
  }

  /**
   * 加载要编辑的社区数据
   * @param id id
   */
  loadById(id: number): void {
    this.communityService.getById(id)
      .subscribe((community) => {
        this.validate(community);
        this.setFormGroupData(community);
        this.community = community;
      }, error => console.log(error))
  }

  /**
   * 提交
   * @param formGroup 表单
   */
  onSubmit(formGroup: FormGroup): void {
    const newCommunity = new Community({
      name: this.formGroup.get(this.formKeys.name).value as string,
      pinyin: this.formGroup.get(this.formKeys.pinyin).value as string,
      town: {
        id: this.formGroup.get(this.formKeys.townId).value,
      } as Town,
      geoJson: this.formGroup.get(this.formKeys.geoJson).value as Attachment
    });

    this.communityService.update(this.community.id, newCommunity)
      .subscribe(
        () => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
    console.log('保存输出', this.formGroup.value);

  }

  /**
   * 设置formGroup表单数据
   * @param community
   */
  public setFormGroupData(community: Community) {
    // 添加两个表单控制器进去，分别控制V层名称及拼音两个表单
    this.formGroup.get(this.formKeys.name).setValue(community.name);
    this.formGroup.get(this.formKeys.pinyin).setValue(community.pinyin);
    this.formGroup.get(this.formKeys.townId).setValue(community.town.id);
    this.formGroup.get(this.formKeys.geoJson).setValue(community.geoJson);
  }

  /**
   * 对属性进行校验
   * @param community 社区
   */
  public validate(community: Community): void {
    Assert.isObject(community, community.town, 'some properties must be object');
    Assert.isString(community.name,
      community.pinyin,
      'some properties must be passed');
    Assert.isNumber(community.town.id,
      'some properties must be number');
  }
}
