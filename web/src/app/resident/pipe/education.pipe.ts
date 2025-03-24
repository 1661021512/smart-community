import { Pipe, PipeTransform } from '@angular/core';
import {EducationType} from "../../../../projects/lib/src/entity/enum/education-type";
import {YzStatusPipe} from "../../share/yz-status/yz-status.pipe";
import {EDUCATION_TYPE} from "../../../../projects/lib/src/entity/enum/education-type";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'education'
})
export class EducationPipe extends YzStatusPipe<EducationType> implements PipeTransform  {
  constructor(domSanitizer: DomSanitizer) {
    super(domSanitizer, EDUCATION_TYPE);
  }
}
