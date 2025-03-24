import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';
import {Relationship} from 'projects/lib/src/entity/relationship';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';

/**
 * 居民关系M层
 */
@Injectable({
  providedIn: 'root'
})

export class RelationshipService {

  // 定义变量并赋值
  private baseUrl = 'relationship';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 删除居民关系
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.baseUrl}/${id}`);
  }

  /**
   * 获取所有的居民关系
   */
  getAll(): Observable<Relationship[]> {
    return this.httpClient.get<Array<Relationship>>(`${this.baseUrl}`)
      .pipe(map(relationships => relationships.map(relationship => new Relationship(relationship)).sort((a, b) => a.weight - b.weight)));
  }

  /**
   * 根据ID获取实体
   * @param id id
   */
  public getById(id: number): Observable<Relationship> {
    Assert.isNumber(id, 'type of id must be number');
    console.log('sevice的获取id');
    return this.httpClient.get<Relationship>(`${this.baseUrl}/${id}`)
      .pipe(map(data => new Relationship(data)));
  }

  /**
   * 获取两个居民间的关系
   * @param oneRelationId 一个居民
   * @param anotherRelationId 另一个居民
   * @return Observable<Relationship> 找到记录，返回记录；未找到，则返回null
   */
  getByResidentIds(oneRelationId: number, anotherRelationId: number): Observable<Relationship | null> {
    const params = new HttpParams()
      .append('oneRelationId', oneRelationId)
      .append('anotherRelationId', anotherRelationId);
    return this.httpClient.get<Relationship>(this.baseUrl + `/getByResidentIds`, {params});
  }

  // 函数page，参数为param是一个对象，函数类型为Observable<Page<Relationship>>
  page(param: {
    page: number,
    size: number,
    name?: string,
  }): Observable<Page<Relationship>> {

    // 定义http请求头，添加page和size
    const httpParams = new HttpParams()
      .append('page', param.page.toString())
      .append('size', param.size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 RELATIONSHIP 对象。
    return this.httpClient.get<Page<Relationship>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Relationship>(data).toObject(o => new Relationship(o))));
  }

  /**
   * 新建居民关系
   */
  public save(relationship: Relationship): Observable<Relationship> {

    return this.httpClient.post(`${this.baseUrl}`, relationship)
      .pipe(map(data => new Relationship(data)));
  }

  /**
   * 更新
   * @param id id
   * @param relationship 居民关系
   */
  public update(id: number, relationship: Relationship): Observable<Relationship> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<Relationship>(`${this.baseUrl}/${id}`, relationship)
      .pipe(map(data => new Relationship(data)));
  }
}

