import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HistoryExportExcel} from '../entity/history-export-excel';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * 历史导出列表服务类
 */
export class HistoryExportExcelService {

  public static BASE_EXPORT_FILENAME = '居民数据导出';

  private baseUrl = 'historyExportExcel';

  constructor(private httpClient: HttpClient) { }

  /**
   * 获取所有的状态是已导出的导出excel表记录
   */
  getAllByStatusIsExported(): Observable<HistoryExportExcel[]> {
    return this.httpClient.get<HistoryExportExcel[]>(`${this.baseUrl}/getAllByStatusIsExported`);
  }
}
