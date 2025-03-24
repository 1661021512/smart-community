import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';

/**
 * 系统设置
 * @author panjie
 */
export class SystemApi implements MockApiInterface {
  
  getInjectors(): ApiInjector[] {
    return [];
  }

}
