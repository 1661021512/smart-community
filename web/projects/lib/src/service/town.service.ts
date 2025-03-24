import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Town} from '../entity/town';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Page} from '@yunzhi/ng-common';
import {Assert} from '@yunzhi/utils';
import {CacheNoticeService} from './cache-notice.service';

/**
 * 乡镇
 */
  // 声明为可注入的
@Injectable({
  providedIn: 'root'
})

// 可被引用的类
export class TownService {

  // 定义变量并赋值
  private baseUrl = 'town';

  // 构造函数声明，并定义参数变量和类型
  constructor(protected httpClient: HttpClient,
              private cacheNoticeService: CacheNoticeService) {
  }

  /**
   * 删除
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => {
        this.cacheNoticeService.clear();
      }));
  }

  /**
   * 获取所有的乡镇
   */
  getAll(): Observable<Town[]> {
    return this.httpClient.get<Array<Town>>(this.baseUrl)
      // 以下完所是数据转换的部分：1. 遍历返回的towns数组。2. 将数据中的每一个json对象转换为 TOWN 对象。
      .pipe(map(towns => towns.map(town => new Town(town))));
  }

  /**
   * 根据ID获取实体
   * @param id id
   */
  public getById(id: number): Observable<Town> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.get<Town>(`${this.baseUrl}/${id}`)
      .pipe(map(data => new Town(data)));
  }

  // 函数page，参数为param是一个对象，函数类型为Observable<Page<Town>>
  page(param: {
    page: number,
    size: number
  }): Observable<Page<Town>> {

    // 定义http请求头，添加page和size
    const httpParams = new HttpParams()
      .append('page', param.page.toString())
      .append('size', param.size.toString())

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 TOWN 对象。
    return this.httpClient.get<Page<Town>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Town>(data).toObject(o => new Town(o))));
  }

  /**
   * 新建乡镇
   */
  save(town: Town): Observable<Town> {
    Assert.isString(town.name, 'type of town name must be string');

    return this.httpClient.post<Town>(`${this.baseUrl}`, town)
      .pipe(map(data => new Town(data)))
      .pipe(tap(() => {
        this.cacheNoticeService.clear();
      }));
  }

  /**
   */
  public update(id: number, town: Town): Observable<Town> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<Town>(`${this.baseUrl}/${id}`, town)
      .pipe(map(data => new Town(data)))
      .pipe(tap(() => {
        this.cacheNoticeService.clear();
      }));
  }

  /**
   * 校验输入的乡镇名称是否已经存在
   */
  public existByName(name: string): Observable<boolean> { //订阅
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<boolean>(this.baseUrl + '/existByName', {params});
  }
}
