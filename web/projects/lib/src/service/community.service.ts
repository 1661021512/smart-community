import {Injectable} from '@angular/core';
import {Community} from "../entity/community";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Assert, isNotNullOrUndefined, Random} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {DistrictService} from "./district.service";

@Injectable({
  providedIn: 'root'
})

/**
 * 社区M层
 */
export class CommunityService {

  private url = 'community';

  constructor(private httpClient: HttpClient,
              private districtService: DistrictService) {
  }

  /**
   * 新建社区
   * @param community 社区
   */
  save(community: Community): Observable<Community> {
    Assert.isString(community.name, 'type of community name must be string');
    Assert.isString(community.pinyin, 'type of community pinyin must be string');
    Assert.isNumber(community.town.id, 'type of townId must be number');

    return this.httpClient.post<Community>(`${this.url}`, community)
      .pipe(map(data => new Community(data)))
      .pipe(tap(() => {this.districtService.clearCache()}));
  }

  /**
   * 获取所有的社区
   */
  getAll(): Observable<Community[]> {
    return this.httpClient.get<Array<Community>>(`${this.url}/getAll`)
      .pipe(map(communities => communities.map(community => new Community(community))));
  }

  /**
   *
   * 根据乡镇ID获取小区
   * @param townId
   */
  getByTownId(townId: number): Observable<Array<Community>> {
    Assert.isNumber(townId, 'townId must be number');
    return this.httpClient.get<Array<Community>>(`${this.url}/getByTownId/${townId}`);
  }

  /**
   * 分页
   * @param param 查询参数
   */
  page(param: {
    page: number,
    size: number,
    name?: string,
  }): Observable<Page<Community>> {
    Assert.isNumber(param.page, param.size, 'page size传入了非法的数字');
    let httpParams = new HttpParams()
      .append('page', param.page.toString())
      .append('size', param.size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 community 对象。
    return this.httpClient.get<Page<Community>>(`${this.url}/page`, {params: httpParams})
      .pipe(map(data => new Page<Community>(data).toObject(d => new Community(d))));
  }

  /**
   * 根据ID获取实体.
   * @param id id
   */
  getById(id: number): Observable<Community> {
    Assert.isNumber(id, 'id类型必须为number');
    return this.httpClient.get<Community>(`${this.url}/${id}`)
      .pipe(map(data => new Community(data)));
  }

  /**
   * 更新
   * @param id id
   * @param community 社区
   */
  update(id: number, community: Community): Observable<Community> {
    Assert.isNumber(id, 'type of id must be number');
    Assert.isString(community.name, 'type of community name must be string');
    Assert.isString(community.pinyin, 'type of community pinyin must be string');
    Assert.isNumber(community.town.id, 'type of townId must be number');

    return this.httpClient.put<Community>(`${this.url}/${id}`, community)
      .pipe(map(data => new Community(data)))
      .pipe(tap(() => {this.districtService.clearCache()}));
  }

  /**
   * 删除
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.url}/${id}`)
      .pipe(tap(() => {this.districtService.clearCache()}));
  }

  /**
   *校验输入的社区名称是否已经存在
   */
  public existByName(name: string): Observable<boolean> { //订阅
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<boolean>(this.url + '/existByName', {params});
  }
}
