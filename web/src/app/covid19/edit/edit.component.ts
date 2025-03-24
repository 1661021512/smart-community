import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements  OnInit {
  @Input()
  resident: Resident;

  @Output()
  beClose = new EventEmitter<void>();
  @Output()
  beSubmit = new EventEmitter<Resident>();

  formKeys = {
    beVaccinated: 'beVaccinated',
    vaccinatedPlace: 'vaccinatedPlace',
    notVaccinatedReason: 'notVaccinatedReason'
  }
  formGroup = new FormGroup({
  });

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.beVaccinated, new FormControl(this.resident.beVaccinated, Validators.required));
    this.formGroup.addControl(this.formKeys.vaccinatedPlace, new FormControl(this.resident.vaccinatedPlace));
    this.formGroup.addControl(this.formKeys.notVaccinatedReason, new FormControl(this.resident.notVaccinatedReason));
  }

  onClose() {
    this.beClose.emit(null);
  }

  onSubmit(formGroup: FormGroup) {
    this.resident.beVaccinated = formGroup.get(this.formKeys.beVaccinated).value as boolean;
    this.resident.vaccinatedPlace = formGroup.get(this.formKeys.vaccinatedPlace).value as string;
    this.resident.notVaccinatedReason = formGroup.get(this.formKeys.notVaccinatedReason).value as string;
    this.beSubmit.emit(this.resident);
  }
}
