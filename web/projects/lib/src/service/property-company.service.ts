import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "@yunzhi/ng-common";
import {map} from "rxjs/operators";
import {Assert} from '@yunzhi/utils';
import {PropertyCompany} from "../entity/property-company";
import {House} from '../entity/house';
import {Village} from '../entity/village';

/**
 * 物业公司
 */
@Injectable({
  providedIn: 'root'
})
export class PropertyCompanyService {
  protected baseUrl = 'propertyCompany';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 删除
   */
  delete(propertyCompanyId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${propertyCompanyId.toString()}`);
  }

  /**
   * 根据ID获取实体
   */
  public getById(id: number): Observable<PropertyCompany> {
    Assert.isNumber(id, 'id must be number');
    return this.httpClient.get<PropertyCompany>(`${this.baseUrl}/${id}`);
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {
    name?: string
  }): Observable<Page<PropertyCompany>> {
    const httpParams = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('name', param.name)
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<PropertyCompany>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<PropertyCompany>(data)));
  }


  /**
   * 物业公司新增
   */
  public save(propertyCompany: PropertyCompany): Observable<PropertyCompany> {
    return this.httpClient.post<PropertyCompany>(`${this.baseUrl}`, propertyCompany);
  }

  /**
   * 更新基本信息
   * @param id id
   * @param newPropertyCompany 更新的物业公司
   */
  update(id: number, newPropertyCompany: PropertyCompany): Observable<PropertyCompany> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<PropertyCompany>(`${this.baseUrl}/${id}`, newPropertyCompany);
  }

}
