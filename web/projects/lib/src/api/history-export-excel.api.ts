import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';

/**
 * 历史导出 EXCEL 记录
 */
export class HistoryExportExcelApi implements MockApiInterface {
  protected url = 'historyExportExcel';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.url + '/getAllByStatusIsExported',
        result: []
      }
    ];
  }
}
