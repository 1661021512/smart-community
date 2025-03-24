import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import { Skill } from 'projects/lib/src/entity/skill';
import { SkillService } from 'projects/lib/src/service/skill.service';

/**
 * 技能特长多选组件
 * #561
 */
@Component({
  selector: 'app-skill-multi-input',
  templateUrl: './skill-multi-select.component.html',
  styleUrls: ['./skill-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => SkillMultiSelectComponent)
    }
  ]
})
export class SkillMultiSelectComponent implements ControlValueAccessor {
  formControl = new FormControl();

  constructor(public multiSelectService: SkillService) {
  }

  registerOnChange(fn: (data: Skill[]) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Skill[]): void {
    this.formControl.setValue(obj);
  }

}
