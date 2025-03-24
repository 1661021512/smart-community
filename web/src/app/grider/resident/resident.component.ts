import {Component, OnInit} from '@angular/core';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {House} from '../../../../projects/lib/src/entity/house';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Assert} from '@yunzhi/utils';
import {concat, of} from 'rxjs';
import {EducationType} from '../../../../projects/lib/src/entity/enum/education-type';

/**
 * 网格员管理自己负责的居民
 */
@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {
  init = false;
  keys = {
    name: 'name',
    sex: 'sex',
    ageBegin: 'ageBegin',
    ageEnd: 'ageEnd',
    idNumber: 'idNumber',
    region: 'region',
    phone: 'phone',
    nationality: 'nationality',
    education: 'education',
    politicalClimate: 'politicalClimate',
    religion: 'religion',
    workPlace: 'workPlace'
  };
  pageData = {} as Page<Resident>;
  queryForm: FormGroup;
  queryParam: QueryParam;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private residentService: ResidentService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.route.params.subscribe(params => {
      this.queryParam = this.getQueryParams(params);
      this.updateFormGroup(this.queryParam);
      this.query(this.queryParam);
    });
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.queryParam.page = page;
    this.query(this.queryParam);
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.queryParam.size = size;
    this.query(this.queryParam);
  }

  onSubmit(queryFormGroup: FormGroup) {
    const params = queryFormGroup.value;
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: CommonService.convertToRouteParams(params),
      }).then();
  };

  onReset() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.queryForm = new FormGroup({});
    for (let key in this.keys) {
      this.queryForm.addControl(this.keys[key], new FormControl());
    }
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

  onDelete(resident: Resident, index: number, houses: House[]) {
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

  getQueryParams(params: Params): QueryParam {
    const result = {
      page: params.page,
      size: params.size,
      name: params.name,
      sex: params.sex,
      ageBegin: Number.isInteger(+params.ageBegin) ? +params.ageBegin : null,
      ageEnd: Number.isInteger(+params.ageEnd) ? +params.ageEnd : null,
      nationality: params.nationality,
      religion: params.religion,
      politicalClimate: params.politicalClimate,
      phone: params.phone,
      education: params.education,
      workPlace: params.workPlace,
      idNumber: params.idNumber
    } as QueryParam;
    return result;
  }

  updateFormGroup(queryParams: QueryParam) {
    this.queryForm.get(this.keys.name).setValue(queryParams.name);
    this.queryForm.get(this.keys.sex).setValue(queryParams.sex);
    this.queryForm.get(this.keys.ageBegin).setValue(queryParams.ageBegin);
    this.queryForm.get(this.keys.ageEnd).setValue(queryParams.ageEnd);
    this.queryForm.get(this.keys.nationality).setValue(queryParams.nationality);
    this.queryForm.get(this.keys.religion).setValue(queryParams.religion);
    this.queryForm.get(this.keys.politicalClimate).setValue(queryParams.politicalClimate);
    this.queryForm.get(this.keys.phone).setValue(queryParams.phone);
    this.queryForm.get(this.keys.education).setValue(queryParams.education);
    this.queryForm.get(this.keys.workPlace).setValue(queryParams.workPlace);
    this.queryForm.get(this.keys.idNumber).setValue(queryParams.idNumber);
  }

  query(params: QueryParam) {
    this.residentService.pageOfCurrentGrider(
      params.page,
      params.size,
      {
        name: params.name,
        sex: params.sex,
        ageBegin: params.ageBegin,
        ageEnd: params.ageEnd,
        nationality: params.nationality,
        religion: params.religion,
        politicalClimate: params.politicalClimate,
        phone: params.phone,
        education: params.education,
        workPlace: params.workPlace,
        idNumber: params.idNumber
      }
    ).subscribe(data => {
      this.pageData = data;
    });
  }
}

interface QueryParam {
  ageBegin: number,
  ageEnd: number,
  education: EducationType,
  idNumber: string,
  name: string,
  // 民族
  nationality: number,
  page: string | number,
  phone: string,
  // 政治面貌
  politicalClimate: number,
  // 宗教信仰
  religion: string,
  sex: number,
  size: string | number,
  workPlace: string,
}
