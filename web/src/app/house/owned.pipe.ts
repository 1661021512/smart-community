import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {HOUSE_OWN_TYPE, HouseOwnType} from "../../../projects/lib/src/entity/enum/house-own-type";
import {YzStatusPipe} from "../share/yz-status/yz-status.pipe";

/**
 * 房屋使用性质（自有、租赁）
 * @author weiweiyi
 */
@Pipe({
  name: 'owned'
})
export class OwnedPipe extends YzStatusPipe<HouseOwnType> implements PipeTransform {
  constructor(domSanitizer: DomSanitizer) {
    super(domSanitizer, HOUSE_OWN_TYPE);
  }
}
