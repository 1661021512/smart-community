import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {Page} from '@yunzhi/ng-common';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {House} from '../../../../projects/lib/src/entity/house';
import {concat, of} from 'rxjs';
import {HistoryExportExcelService} from '../../../../projects/lib/src/service/history-export-excel.service';

/**
 * 居民管理
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isShowExportExcelList = false;
  keys = {
    idNumber: 'idNumber',
    phone: 'phone',
    name: 'name',
    politicalClimate: 'politicalClimate',
    education: 'education',
    religion: 'religion',
    workPlace: 'workPlace',
    districtId: 'districtId',
    ageBegin: 'beginAge',
    ageEnd: 'engAge',
    nationality: 'nation',
    sex: 'sex',
    page: 'page',
    size: 'size'
  };
  pageData = {} as Page<Resident>;
  params = {} as Params;
  queryForm = new FormGroup({});
  random: number;

  constructor(private residentService: ResidentService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private historyExportExcelService: HistoryExportExcelService) {
  }

  /**
   * 向后台发起数据查询
   * @param params 查询参数
   */
  load(params: Params): void {
    getDefaultWhenValueIsInValid(params[this.keys.page], '0');
    getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());
    this.residentService.page(
      getDefaultWhenValueIsInValid(+params[this.keys.page], 0),
      getDefaultWhenValueIsInValid(+params[this.keys.size], config.size),
      {
        sex: params[this.keys.sex],
        name: params[this.keys.name],
        ageBegin: params[this.keys.ageBegin],
        ageEnd: params[this.keys.ageEnd],
        religion: params[this.keys.religion],
        phone: params[this.keys.phone],
        idNumber: params[this.keys.idNumber],
        workPlace: params[this.keys.workPlace],
        politicalClimate: params[this.keys.politicalClimate],
        nationality: params[this.keys.nationality],
        education: params[this.keys.education],
        districtId: params[this.keys.districtId]
      }
    ).subscribe(page => {
      this.validateData(page);
      this.pageData = page;
    });
  }

  ngOnInit(): void {
    this.initQueryForm();
    this.subscribeParams();
    this.historyExportExcelService.getAllByStatusIsExported().subscribe(data => {
      this.isShowExportExcelList = data.length !== 0;
      });
  }

  onDelete(resident: Resident, index: number, houses: House[]): void {
    Assert.isNotNullOrUndefined(resident.id, 'id未定义');
    if (houses.length > 1) {
      this.commonService.confirm(confirmed => {
          if (!confirmed) {
            this.commonService.confirm((confirm) => {
              if (confirm) {
                let observable = concat(of(null));
                houses.forEach(house => {
                  observable = concat(observable, this.residentService.removeHouse(resident.id, house.id));
                });
                observable.subscribe({
                  complete: () => {
                    this.commonService.success(() =>
                      this.pageData.content.splice(index, 1));
                  }
                });
              }
            }, '');
          } else {
            resident._showRemoveHouse = true;
            this.commonService.info(() => {
            }, '请在对应住址后选择要移除的住房');
          }
        },
        '当前居民有多处住房，请选择删除的范围', '请选择', '某一个', '全部')
    } else {
      this.commonService.confirm(confirm => {
        if (confirm) {
          const house = houses[0];
          Assert.isInteger(house.id, '住房 ID 必须是 int');
          this.residentService.removeHouse(resident.id, house.id)
            .subscribe(() =>
              this.commonService.success(() =>
                this.pageData.content.splice(index, 1)));
        }
      });
    }
  }

  onExportToExcel() {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        let loading: {close: () => void, updateProgress: (progress: number) => void};
        const params = this.params;
        const now = new Date();
        this.residentService.exportToExcel(
          getDefaultWhenValueIsInValid(+params[this.keys.page], 0),
          getDefaultWhenValueIsInValid(+params[this.keys.size], config.size),
          {
            sex: params[this.keys.sex],
            name: params[this.keys.name],
            ageBegin: params[this.keys.ageBegin],
            ageEnd: params[this.keys.ageEnd],
            districtId: params[this.keys.districtId],
            religion: params[this.keys.religion],
            phone: params[this.keys.phone],
            idNumber: params[this.keys.idNumber],
            workPlace: params[this.keys.workPlace],
            politicalClimate: params[this.keys.politicalClimate],
            nationality: params[this.keys.nationality],
            education: params[this.keys.education],
          }, '居民数据导出' + now.getFullYear() + '_' + (now.getMonth() + 1) + '_' + now.getDate() + '.xlsx').subscribe({
            next: data => {
              // 如果data为-1（返回等待导出信息），则提示用户
              if (data === ResidentService.WAIT_EXPORT) {
                this.commonService.success(() => {
                }, '当前导出任务众多，加入导出队列成功，请稍后在右侧历史导出记录查看');
                this.isShowExportExcelList = true;
              } else {
                // data为非负数，为导出当前进度
                if (typeof loading === 'undefined') {
                  loading = this.commonService.loading('下载中', '当前进度：', data);
                } else {
                  loading.updateProgress(data);
                  // 不能在请求方法结束时关闭弹出框，如果是等待下载情况则会在控制台报错。
                  if (data == 100) {
                    loading.close();
                    this.isShowExportExcelList = true;
                  }
                }
              }
            }
          }
        );
      }
    }, '系统将记录您的导出过程，请谨慎操作', '敏感操作');
  }

  /**
   * 点击页码
   * @param page 第几页
   */
  onPageChange(page: number): void {
    this.params = {...this.params, ...{page}};
    this.reload(this.params);
  }

  onRemoveHouse(resident: Resident, index: number, houseId: number) {
    Assert.isInteger(resident.id, houseId, '居民和住房类型必须为int');
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.residentService.removeHouse(resident.id, houseId)
          .subscribe(() => resident.houses.splice(index, 1));
      }
    });
  }

  /**
   * 重置查询表单
   */
  onReset(): void {
    this.queryForm.get(this.keys.sex).setValue('');
    this.queryForm.get(this.keys.name).setValue('');
    this.queryForm.get(this.keys.ageBegin).setValue(null);
    this.queryForm.get(this.keys.ageEnd).setValue(null);
    this.queryForm.get(this.keys.religion).setValue('');
    this.queryForm.get(this.keys.phone).setValue('');
    this.queryForm.get(this.keys.idNumber).setValue('');
    this.queryForm.get(this.keys.districtId).setValue('');
    this.queryForm.get(this.keys.workPlace).setValue('');
    this.queryForm.get(this.keys.politicalClimate).setValue(null);
    this.queryForm.get(this.keys.nationality).setValue(null);
    this.queryForm.get(this.keys.education).setValue(null);
  }

  /**
   * 点击每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.params.size = size;
    this.reload(this.params);
  }

  /**
   * 提交数据
   * @param queryForm 查询表单
   */
  onSubmit(queryForm: FormGroup) {
    this.params = {...this.params, ...queryForm.value}
    this.reload(this.params);
  }

  /**
   * 重新加载
   * @param params 查询参数
   */
  public reload(params: Params) {
    this.commonService.reload(params, this.route);
  }

  /**
   * 订阅查询参数
   */
  public subscribeParams(): void {
    this.route.params.subscribe((params: {page?: string, size?: string}) => {
      this.params = params;
      this.updateQueryForm(this.params);
      this.load(params);
    });
  }

  /**
   * 更新表单
   * @param params 查询参数
   */
  public updateQueryForm(params: Params): void {
    this.queryForm.get(this.keys.sex).setValue(params[this.keys.sex]);
    this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
    this.queryForm.get(this.keys.ageBegin).setValue(params[this.keys.ageBegin]);
    this.queryForm.get(this.keys.ageEnd).setValue(params[this.keys.ageEnd]);
    this.queryForm.get(this.keys.religion).setValue(params[this.keys.religion]);
    this.queryForm.get(this.keys.phone).setValue(params[this.keys.phone]);
    this.queryForm.get(this.keys.idNumber).setValue(params[this.keys.idNumber]);
    this.queryForm.get(this.keys.districtId).setValue(params[this.keys.districtId]);
    this.queryForm.get(this.keys.workPlace).setValue(params[this.keys.workPlace]);
    this.queryForm.get(this.keys.politicalClimate).setValue(params[this.keys.politicalClimate]);
    this.queryForm.get(this.keys.nationality).setValue(params[this.keys.nationality]);
    this.queryForm.get(this.keys.education).setValue(params[this.keys.education]);
  }

  validateData(page: Page<Resident>) {
    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, '未满足初始化条件');
    page.content.forEach(resident => {
      Assert.isNotNullOrUndefined(
        resident.name,
        resident.religiousBelief,
        resident.encodedPhone,
        resident.encodedIdNumber,
        resident.workPlace,
        resident.politicalClimate,
        resident.nationality,
        resident.education,
        '未满足table初始化条件'
      );
    });
  }

  /**
   * 初始化查询组件
   */
  private initQueryForm() {
    this.queryForm.addControl(this.keys.name, new FormControl(''));
    this.queryForm.addControl(this.keys.ageBegin, new FormControl(null));
    this.queryForm.addControl(this.keys.ageEnd, new FormControl(null));
    this.queryForm.addControl(this.keys.districtId, new FormControl(''));
    this.queryForm.addControl(this.keys.sex, new FormControl(null));
    this.queryForm.addControl(this.keys.education, new FormControl(null));
    this.queryForm.addControl(this.keys.idNumber, new FormControl(''));
    this.queryForm.addControl(this.keys.nationality, new FormControl(null));
    this.queryForm.addControl(this.keys.phone, new FormControl(''));
    this.queryForm.addControl(this.keys.politicalClimate, new FormControl(null));
    this.queryForm.addControl(this.keys.religion, new FormControl(''));
    this.queryForm.addControl(this.keys.workPlace, new FormControl(''));
  }
}
