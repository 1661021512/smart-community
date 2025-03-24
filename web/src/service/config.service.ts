import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from '../../projects/lib/src/service/common.service';
import {ApiPrefixAndMergeMapInterceptor} from '../interceptor/api-prefix-and-merge-map.interceptor';
import {Assert} from '@yunzhi/utils';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;
  private url = 'config.json';

  constructor(private httpClient: HttpClient,
              private commonService: CommonService) {
    this.config = require('../config.json');
    Assert.notNull(this.config.version, 'version未定义');
    Assert.notNull(this.config.apiVersion, 'apiVersion未定义');
  }

  /**
   * 检查数据是否最新
   * @param data 新获取的数据
   */
  private checkData(data: Config): boolean {
    return !(data.version !== this.config.version || data.apiVersion !== this.config.apiVersion);
  }

  checkVersion(): void {
    const readyItem = this.commonService.getAppOnReadyItem();
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set(ApiPrefixAndMergeMapInterceptor.DONT_INTERCEPT_HEADER_KEY, 'true');
    this.httpClient.get<Config>(this.url, {headers})
      .subscribe(data => {
        if (!this.checkData(data)) {
          this.httpClient.get('', {headers, responseType: 'text'})
            .subscribe(() => {
              location.reload();
            });

        } else {
          readyItem.ready = true;
        }
      });
  }
}

export class Config {
  apiVersion: string | undefined;
  version: string | undefined;
}
