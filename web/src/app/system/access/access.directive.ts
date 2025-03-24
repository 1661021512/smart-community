import {Directive} from '@angular/core';

/**
 * 当前登录用户是否拥有指定的权限
 * #394
 */
@Directive({
  selector: '[appAccess]'
})
export class AccessDirective {


  constructor() {
  }

}
