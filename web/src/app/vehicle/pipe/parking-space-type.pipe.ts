import {Pipe, PipeTransform} from '@angular/core';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'parkingSpaceType'
})
export class ParkingSpaceTypePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(parkingSpaceType: number): SafeHtml {

    if (!isNotNullOrUndefined(parkingSpaceType)) {
      return '-';
    }

    let clazz = 'secondary';
    let value = '租赁';

    if (!parkingSpaceType) {
      clazz = 'success';
      value = '购买';
    }

    return this.domSanitizer.bypassSecurityTrustHtml(`<span class="badge badge-${clazz}">${value}</span>`);
  }

}
