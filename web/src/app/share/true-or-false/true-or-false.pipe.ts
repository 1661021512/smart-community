import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {isNotNullOrUndefined} from "@yunzhi/utils";

@Pipe({
  name: 'trueOrFalse'
})
export class TrueOrFalsePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(input: boolean, ...args: unknown[]): SafeHtml {

    if (!isNotNullOrUndefined(input)){
      return '-';
    }

    let clazz = 'primary';
    let value = '是';

    if (!input) {
      clazz = 'info';
      value = '否'
    }

    return this.domSanitizer.bypassSecurityTrustHtml(`<span class="badge badge-${clazz}">${value}</span>`)
  }

}
