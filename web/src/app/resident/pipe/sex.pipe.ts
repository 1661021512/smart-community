import {Pipe, PipeTransform, Sanitizer} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {isNotNullOrUndefined} from '@yunzhi/utils';

/**
 * 性别管道
 */
@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(input: boolean, ...args: unknown[]): SafeHtml {
    if (!isNotNullOrUndefined(input)) {
      return '-';
    }

    let clazz = 'primary';
    let value = '男'

    if (!input) {
      clazz = 'info';
      value = '女'
    }

    return this.domSanitizer.bypassSecurityTrustHtml(`<span class="badge badge-${clazz}">${value}</span>`);
  }
}
