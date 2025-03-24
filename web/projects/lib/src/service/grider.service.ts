import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Grider} from 'projects/lib/src/entity/grider';
import {Page} from '@yunzhi/ng-common';

/**
 * 网格员管理层
 */
@Injectable({
  providedIn: 'root'
})
export class GriderService {

  protected baseUrl = 'grider';

  constructor(protected httpClient: HttpClient) {
  }

  /**
   * 删除
   */
  delete(griderId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${griderId.toString()}`);
  }

  /**
   * 校验输入的用户名（手机号码）是否已经在网格员存在
   */
  public existByUsername(username: string): Observable<boolean> {
    //订阅
    const params = new HttpParams().append('username', username);
    return this.httpClient.get<boolean>(this.baseUrl + '/existByUsername', {params});
  }

  /**
   * 通过Id获取用户
   */
  getById(griderId: number): Observable<Grider> {
    return this.httpClient.get<Grider>(`${this.baseUrl}/${griderId}`);
  }

  /**
   * 根据userId 获得网格员信息
   */
  public getByUserId(userId: number): Observable<Grider> {
    Assert.isNumber(userId, 'userId must be number');
    return this.httpClient.get<Grider>(`${this.baseUrl}/getGriderByUserId/${userId}`);
  }

  /**
   * 分页
   */
  page(page: number, size: number, param?: {
    name?: string
  }): Observable<Page<Grider>> {
    // 定义http请求头，添加page和size
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 Grider 对象。
    return this.httpClient.get<Page<Grider>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Grider>(data)));
  }

  /**
   * 网格员新增
   */
  public save(grider: Grider): Observable<Grider> {
    // 向后台请求,并通过管道返回Grider对象
    return this.httpClient.post<Grider>(`${this.baseUrl}`, grider);
  }

  /**
   * 更新
   * @param id ID
   * @param grider 网格员
   * @author panjie
   */
  update(id: number, grider: {webUser: {name: string}, community?: {id: number}}): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl + '/' + id, grider);
  }
}
