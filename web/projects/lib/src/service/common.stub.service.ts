import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub} from '@yunzhi/ng-router-testing';
import {of} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * 用于测试的测试桩.
 * 其实应该在@yunzhi/ng-router-testing Router中的navigate方法
 */
@Injectable()
export class CommonStubService extends CommonService {

  constructor(router: Router, domSanitizer: DomSanitizer, private route: ActivatedRoute) {
    super(router, domSanitizer);
  }

  reloadByParam(params: { [header: string]: string | string[] | number | number[] | null | undefined; }): Promise<boolean> {
    const queryParams = CommonService.convertToRouteParams(params);
    if (this.route instanceof ActivatedRouteStub) {
      console.log('发送新参数', queryParams);
      const routeStub = this.route as unknown as ActivatedRouteStub;
      routeStub.paramsSubject.next(queryParams);
    } else {
      console.warn('未获取到用于测试的ActivatedRouteStub，请确认引入了@yunzhi/ng-router-testing的RouterTestingModule');
    }

    return of(true).toPromise();
  }
}
