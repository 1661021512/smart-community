import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TownService} from '../../../../projects/lib/src/service/town.service';
import {ActivatedRoute} from '@angular/router';
import {Town} from '../../../../projects/lib/src/entity/town';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Assert} from '@yunzhi/utils';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';

/**
 * 乡镇编辑
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  /**
   * 表单组，用于存放多个formControl
   */
  formGroup = new FormGroup({
    id: new FormControl('', Validators.required)
  })
  formKeys = {
    name: 'name',
    pinyin: 'pinyin',
    geoJson: 'geoJson',
    secondaryGeoJson: 'secondaryGeoJson'
  };

  constructor(private townService: TownService,
              private commonService: CommonService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.pinyin, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.geoJson, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.secondaryGeoJson, new FormControl(null));

    // 获取id并找出对应town
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  /**
   * 由后台加载预编辑的城镇
   * @param id
   */
  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.townService.getById(id)
      .subscribe((town) => {
        Assert.isNotNullOrUndefined(town, town.name, town.pinyin, 'some properties must be passed');
        this.formGroup.get('name').setValue(town.name);
        this.formGroup.get('pinyin').setValue(town.pinyin);
        this.formGroup.get(this.formKeys.geoJson).setValue(town.geoJson);
        this.formGroup.get(this.formKeys.secondaryGeoJson).setValue(town.secondaryGeoJson);
      }, error => console.log(error))
  }

  onSubmit(formGroup: FormGroup): void {
    const id = formGroup.get('id').value;
    const newTown = new Town({
      id: formGroup.get('id').value,
      name: formGroup.get('name').value,
      pinyin: formGroup.get('pinyin').value,
      geoJson: formGroup.get(this.formKeys.geoJson).value as Attachment,
      secondaryGeoJson: formGroup.get(this.formKeys.secondaryGeoJson).value as Attachment
    });

    this.townService.update(id, newTown)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }
}
