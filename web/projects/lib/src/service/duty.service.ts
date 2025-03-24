import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Duty} from '../entity/duty';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';
import {DistrictType} from '../entity/enum/district-type';
import {WebUserService} from '../../../../src/service/web-user.service';

/**
 * 岗位管理M层
 */
@Injectable({
  providedIn: 'root'
})
export class DutyService {

  private baseUrl = 'duty';

  constructor(private httpClient: HttpClient,
              private userService: WebUserService) {
  }

  // 分页
  page(param: {
    page: number,
    size: number,
    name?: string
  }): Observable<Page<Duty>> {
    // 定义http请求头，添加page和size
    const httpParams = new HttpParams()
      .append('page', param.page.toString())
      .append('size', param.size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 duty 对象。
    return this.httpClient.get<Page<Duty>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Duty>(data).toObject(o => new Duty(o))));
  }

  /**
   * 新建岗位
   */
  save(post: Duty): Observable<Duty> {
    Assert.isString(post.name, 'type of duty name must be string');
    Assert.isNumber(post.weight, 'type of weight must be number');
    Assert.isString(post.typeOfDistrict, 'type of typeOfDistrict must be string');
    return this.httpClient.post<Duty>(`${this.baseUrl}`, post)
      .pipe(map(data => new Duty(data)));
  }

  /**
   * 根据ID获取实体
   * @param id id
   */
  public getById(id: number): Observable<Duty> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.get<Duty>(`${this.baseUrl}/${id}`)
      .pipe(map(data => new Duty(data)));
  }

  /**
   * 更新
   * @param id id
   * @param post 岗位
   */
  update(id: number, post: Duty): Observable<Duty> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<Duty>(`${this.baseUrl}/${id}`, post)
      .pipe(map(data => new Duty(data)));
  }

  /**
   * 删除
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.baseUrl}/${id}`);
  }

  /**
   * 获取岗位列表
   * @param type 区域类型
   */
  getAllByDistrictType(type: DistrictType): Observable<Duty[]> {
    return this.httpClient.get<Duty[]>(`${this.baseUrl}/getAllByDistrictType/${type}`);
  }

  /**
   * 根据当前登录用户所在区域的类型，获取岗位列表
   */
  getAllOfCurrentLoginUserDistrictType(): Observable<Duty[]> {
    return new Observable<Duty[]>(subscriber => {
      this.userService.currentLoginUser$.subscribe(user => {
        this.getAllByDistrictType(user.district.type)
          .subscribe({
            next: posts => subscriber.next(posts),
            complete: () => subscriber.complete()
          });
      })
    });
  }
}
