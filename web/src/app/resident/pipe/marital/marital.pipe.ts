import {Pipe, PipeTransform} from '@angular/core';
import {YzStatusPipe} from '../../../share/yz-status/yz-status.pipe';
import {MARITAL_TYPES, MaritalType} from '../../../../../projects/lib/src/entity/enum/marital-type';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'marital'
})
export class MaritalPipe extends YzStatusPipe<MaritalType> implements PipeTransform {

  constructor(domSanitizer: DomSanitizer) {
    super(domSanitizer, MARITAL_TYPES);
  }
}
