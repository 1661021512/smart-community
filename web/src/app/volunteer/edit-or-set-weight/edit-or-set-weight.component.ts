import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Volunteer} from "../../../../projects/lib/src/entity/volunteer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * 设置排名
 */
@Component({
  selector: 'app-edit-or-set-weight',
  templateUrl: './edit-or-set-weight.component.html',
  styleUrls: ['./edit-or-set-weight.component.scss']
})
export class EditOrSetWeightComponent implements OnInit {
  @Output()
  beClose = new EventEmitter<void>();
  @Output()
  beSubmit = new EventEmitter<{volunteer: Volunteer, weight: number}>();
  formGroup = new FormGroup({});
  formKey = {
    weight: 'weight'
  }
  @Input()
  volunteer: Volunteer;

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKey.weight, new FormControl(this.volunteer.weight, Validators.required));
  }

  onClose() {
    this.beClose.emit(null);
  }

  onSubmit(formGroup: FormGroup) {
    const weight = formGroup.get(this.formKey.weight).value as number;
    this.beSubmit.emit({volunteer: this.volunteer, weight});
  }
}
