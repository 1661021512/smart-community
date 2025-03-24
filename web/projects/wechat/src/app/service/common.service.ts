import {Injectable} from '@angular/core';
import {CommonService as BaseCommonService} from '../../../../lib/src/service/common.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseCommonService {

  constructor(protected router: Router, protected domSanitizer: DomSanitizer) {
    super(router, domSanitizer);
  }

  canBack(): Observable<boolean> {
    return this.canBack$;
  }

  error = (callback?: () => void, description: string = '', title: string = '操作失败'): void => {
    throw Error(description);
  }
}
