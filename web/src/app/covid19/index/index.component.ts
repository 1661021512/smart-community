import {Component, OnInit} from '@angular/core';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {config} from '../../../conf/app.config';
import {Page} from '@yunzhi/ng-common';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {FormControl, FormGroup} from '@angular/forms';
import {Assert, randomNumber} from '@yunzhi/utils';
import {Subject} from 'rxjs';
import {CommonService} from '../../../../projects/lib/src/service/common.service';


/**
 * 新冠专项
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  batchEditDisabled = true;
  editResident = {} as Resident;
  keys = {
    ageBegin: 'ageBegin',
    ageEnd: 'ageEnd',
    idNumber: 'idNumber',
    districtId: 'districtId',
    phone: 'phone',
    name: 'name',
    beVaccinated: 'beVaccinated'
  };
  pageData = {} as Page<Resident>;
  params = {
    page: 0,
    size: config.size,
    ageBegin: null as number,
    ageEnd: null as number,
    idNumber: null as string,
    districtId: null as number,
    phone: '' as string,
    name: '' as string,
    beVaccinated: null as boolean
  }
  queryForm = new FormGroup({});
  randomId = randomNumber();
  showBatchEdit = false;
  singleCheckboxChangeSubject = new Subject<void>();
  singleCheckboxChange$ = this.singleCheckboxChangeSubject.asObservable();
  private editingResidents: Resident[];

  constructor(private residentService: ResidentService,
              private commonService: CommonService) {
  }

  load() {
    this.residentService.page(this.params.page,
      this.params.size, {
        beVaccinated: this.params.beVaccinated,
        ageBegin: this.params.ageBegin,
        ageEnd: this.params.ageEnd,
        idNumber: this.params.idNumber,
        districtId: this.params.districtId,
        phone: this.params.phone,
        name: this.params.name
      }).subscribe(data => {
      this.setPageData(data);
    });
  }

  ngOnInit(): void {
    this.queryForm.addControl(this.keys.name, new FormControl(this.params.name));
    this.queryForm.addControl(this.keys.ageBegin, new FormControl(this.params.ageBegin));
    this.queryForm.addControl(this.keys.ageEnd, new FormControl(this.params.ageEnd));
    this.queryForm.addControl(this.keys.idNumber, new FormControl(this.params.idNumber));
    this.queryForm.addControl(this.keys.districtId, new FormControl(this.params.districtId));
    this.queryForm.addControl(this.keys.phone, new FormControl(this.params.phone));
    this.queryForm.addControl(this.keys.beVaccinated, new FormControl(this.params.beVaccinated));
    this.load();
  }

  /**
   * 批量编辑
   */
  onBatchEdit(residents: Resident[]) {
    this.editingResidents = residents.filter(resident => resident._checked);
    this.editResident = new Resident({
      beVaccinated: true,
      vaccinatedPlace: '',
      notVaccinatedReason: ''
    });
    this.showBatchEdit = true;
  }

  onBatchEditClose() {
    this.showBatchEdit = false;
  }

  onBatchEditSubmit(editResident: Resident) {
    this.editingResidents.forEach(resident => {
      resident.beVaccinated = editResident.beVaccinated;
      resident.vaccinatedPlace = editResident.vaccinatedPlace;
      resident.notVaccinatedReason = editResident.notVaccinatedReason;
    });
    this.residentService.updateAll(this.editingResidents)
      .subscribe(() => this.commonService.success(() => this.showBatchEdit = false));
  }

  onCheckAllChange() {
    this.reComputeBatchEditDisabled();
  }

  onEdit(resident: Resident) {
    this.editingResidents = [resident];
    this.editResident = resident;
    this.showBatchEdit = true;
  }

  onPageChange(page: number) {
    this.params.page = page;
    this.load();
  }

  onSingleCheckboxChange($event: boolean, resident: Resident) {
    resident._checked = $event;
    this.singleCheckboxChangeSubject.next(null);
    this.reComputeBatchEditDisabled();
  }

  onSizeChange(size: number) {
    this.params.size = size;
    this.reload();
  }

  onSubmit(queryForm: FormGroup) {
    this.params.ageBegin = queryForm.get(this.keys.ageBegin).value as number;
    this.params.ageEnd = queryForm.get(this.keys.ageEnd).value as number;
    this.params.idNumber = queryForm.get(this.keys.idNumber).value as string;
    this.params.districtId = queryForm.get(this.keys.districtId).value as number;
    this.params.phone = queryForm.get(this.keys.phone).value as string;
    this.params.name = queryForm.get(this.keys.name).value as string;
    this.params.beVaccinated = queryForm.get(this.keys.beVaccinated).value as boolean;
    this.reload();
  }

  reComputeBatchEditDisabled(): void {
    this.batchEditDisabled = true;
    this.pageData.content.forEach(value => {
      if (this.batchEditDisabled && value._checked) {
        this.batchEditDisabled = false;
      }
    });
  }

  reload(): void {
    this.load();
  }

  setPageData(pageData: Page<Resident>): void {
    pageData.content.forEach(resident => {
      Assert.isArray(resident.houses, '房屋类型不是数组');
      resident.houses.forEach(house => {
        Assert.isDefined(house.grider, '网格员未定义');
        if (house.grider) {
          Assert.isDefined(house.grider.webUser, '未获取到网格员对应的用户');
        }
      });
    });
    this.pageData = pageData;
  }
}
