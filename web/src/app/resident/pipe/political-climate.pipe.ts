import { Pipe, PipeTransform } from '@angular/core';
import {YzStatusPipe} from '../../share/yz-status/yz-status.pipe';
import {POLITICAL_TYPE, politicalType} from '../../../../projects/lib/src/entity/enum/political-type';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * 政治面貌管道 #521
 * Author zhangrui
 */
@Pipe({
  name: 'politicalClimate'
})
export class PoliticalClimatePipe extends YzStatusPipe<politicalType> implements PipeTransform {
  constructor(domSanitizer: DomSanitizer) {
    super(domSanitizer, POLITICAL_TYPE);
  }
}
