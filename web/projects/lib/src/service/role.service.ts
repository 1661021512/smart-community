import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "@yunzhi/ng-common";
import {map} from "rxjs/operators";
import {Role} from "../entity/role";
import {Assert} from "@yunzhi/utils";
/**
 * 角色管理M层 @Author duangshuangyu
 */
// 声明为可注入的
@Injectable({
  providedIn: 'root'
})

// 可被引用的类
export class RoleService {

  // 定义变量并赋值
  private baseUrl = 'role';

  // 构造函数声明，并定义参数变量和类型
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${this.baseUrl}`);
  }

  // 函数page，参数为param是一个对象，函数类型为Observable<Page<Role>>
  /**
   * 根据ID获取实体
   * @param id id
   */
  public getById(id: number): Observable<Role> {
    Assert.isNumber(id, 'type of id must be number');
    console.log('service的获取id');
    return this.httpClient.get<Role>(`${this.baseUrl}/${id}`)
      .pipe(map(data => new Role(data)));
  }

  page(param: {
    page: number,
    size: number
  }): Observable<Page<Role>> {

    // 定义http请求头，添加page和size
    const httpParams = new HttpParams()
      .append('page', param.page.toString())
      .append('size', param.size.toString())

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 ROLE 对象。
    return this.httpClient.get<Page<Role>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Role>(data).toObject(o => new Role(o))));
  }

  /**
   * 新建角色
   */
  public save(role: Role): Observable<Role> {
    return this.httpClient.post(`${this.baseUrl}`, role).pipe(map(role => new Role(role)))
  }

  /**
   * 更新
   * @param id id
   */
  public update(id: number, role: Role): Observable<Role> {
    Assert.isNumber(id, 'type of id must be number');

    return this.httpClient.put<Role>(`${this.baseUrl}/${id}`, role)
      .pipe(map(data => new Role(data)));
  }
}
