import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {Building} from '../../../../projects/lib/src/entity/building';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {House} from '../../../../projects/lib/src/entity/house';

@Component({
  templateUrl: './view2d.component.html',
  styleUrls: ['./view2d.component.scss']
})
export class View2dComponent implements OnInit {

  building: Building;
  filter: (resident: Resident) => boolean;
  keys = {
    name: 'name',
    sex: 'sex',
    ageBegin: 'ageBegin',
    ageEnd: 'ageEnd',
    idNumber: 'idNumber',
    phone: 'phone',
    // 民族
    nationality: 'nationality',
    education: 'education',
    // 政治面貌
    politicalClimate: 'politicalClimate',
    // 宗教
    religion: 'religion',
    workPlace: 'workPlace'
  };
  queryForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private buildingService: BuildingService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.filter = (jsonResident: Resident): boolean => {
      const resident = new Resident(jsonResident);
      let result = true;
      let emptyQueryParams = true;
      const name = this.queryForm.get(this.keys.name).value as string;
      const sex = this.queryForm.get(this.keys.sex).value as string;
      const ageBegin = this.queryForm.get(this.keys.ageBegin).value as number;
      const ageEnd = this.queryForm.get(this.keys.ageEnd).value as number;
      const idNumber = this.queryForm.get(this.keys.idNumber).value as string;
      const phone = this.queryForm.get(this.keys.phone).value as string;
      const nationality = this.queryForm.get(this.keys.nationality).value as number;
      const education = this.queryForm.get(this.keys.education).value as number;
      const politicalClimate = this.queryForm.get(this.keys.politicalClimate).value as number;
      const religion = this.queryForm.get(this.keys.religion).value as string;
      const workPlace = this.queryForm.get(this.keys.workPlace).value as string;
      if (result && name !== '') {
        emptyQueryParams = false;
        result = result && resident.name.includes(name);
      }

      if (result && sex && sex !== 'null') {
        emptyQueryParams = false;
        if (sex === '1') {
          result = result && resident.sex;
        } else {
          result = result && !resident.sex;
        }
      }

      if (result && ageBegin !== null) {
        emptyQueryParams = false;
        result = result && resident.getAge() >= ageBegin;
      }

      if (result && ageEnd !== null) {
        emptyQueryParams = false;
        result = result && resident.getAge() < ageEnd;
      }

      if (result && idNumber !== '') {
        emptyQueryParams = false;
        result = result && resident.idNumber.includes(idNumber);
      }

      if (result && phone !== '') {
        emptyQueryParams = false;
        result = result && resident.phone.includes(phone);
      }

      if (result && nationality !== null) {
        emptyQueryParams = false;
        result = result && resident.nationality === nationality;
      }

      if (result && education !== null) {
        emptyQueryParams = false;
        console.log(education);
        result = result && resident.education === education;
      }

      if (result && politicalClimate!== null) {
        emptyQueryParams = false;
        result = result && resident.politicalClimate === politicalClimate;
      }

      if (result && religion !== '') {
        emptyQueryParams = false;
        result = result && resident.religion.includes(religion);
      }

      if (result && workPlace !== '') {
        emptyQueryParams = false;
        result = result && resident.workPlace.includes(workPlace);
      }

      return emptyQueryParams ? false : result;
    }
    this.route.params.subscribe({
      next: (params: {buildingId?: string}) => {
        const buildingId = +params.buildingId;
        Assert.isInteger(buildingId, '传入的buildingID不正确');
        this.buildingService.getByIdWithUnitsToResidents(buildingId)
          .subscribe(building => this.setData(building))
      }
    });
  }

  setData(building: Building): void {
    this.validate(building);
    this.building = building;
  }

  validate(building: Building) {

  }


  onReset() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.queryForm = new FormGroup({});
    this.queryForm.addControl(this.keys.name, new FormControl(''));
    this.queryForm.addControl(this.keys.sex, new FormControl(''));
    this.queryForm.addControl(this.keys.ageBegin, new FormControl(null));
    this.queryForm.addControl(this.keys.ageEnd, new FormControl(null));
    this.queryForm.addControl(this.keys.idNumber, new FormControl(''));
    this.queryForm.addControl(this.keys.phone, new FormControl(''));
    this.queryForm.addControl(this.keys.nationality, new FormControl(null));
    this.queryForm.addControl(this.keys.education, new FormControl(null));
    this.queryForm.addControl(this.keys.politicalClimate, new FormControl(null));
    this.queryForm.addControl(this.keys.religion, new FormControl(''));
    this.queryForm.addControl(this.keys.workPlace, new FormControl(''));
  }

  getFlex(floor: Array<House>) {
    return '0 0 ' + 100 / floor.length + '%';
  }
}
