import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Village} from '../entity/village';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {DistrictService} from './district.service';
import {HouseType} from '../entity/enum/house-type';
import {WebUserService} from '../../../../src/service/web-user.service';

@Injectable({
  providedIn: 'root'
})
/**
 * 小区M层
 */
export class VillageService {
  // 更新baseUrl为url
  private url = 'village';
  private cache: {
    all: Village[]
  };

  constructor(private httpClient: HttpClient,
              private userService: WebUserService,
              private districtService: DistrictService) {
    this.initCache();
    this.userService.currentLoginUser$.subscribe(() => {
      this.clearCache();
    });
  }

  public initCache(): void {
    this.cache = {
      all: undefined
    };
  }

  public clearCache(): void {
    this.initCache();
  }

  /**
   * 新建小区
   * @param village 小区
   */
  save(village: Village): Observable<Village> {
    Assert.isString(village.name, 'type of village name must be string');
    Assert.isString(village.pinyin, 'type of village pinyin must be string');
    Assert.isNumber(village.longitude, 'type of village longitude must be number');
    Assert.isNumber(village.latitude, 'type of village latitude must be number');
    Assert.isDefined(village.community, village.community.id, 'village.community must defined');
    // Assert.isDefined(village.model, village.model.id, 'village.model must defined');
    Assert.isNumber(village.establishTime, 'type of establishTime must be string');
    Assert.isNumber(village.houseType, 'type of VillageBuildingType must be number');


    return this.httpClient.post<Village>(`${this.url}`, village)
      .pipe(map(data => new Village(data)))
      .pipe(tap(() => {
        this.clearCache();
        this.districtService.clearCache();
      }));
  }

  /**
   * 获取所有的小区
   */
  getAll(): Observable<Array<Village>> {
    if (typeof this.cache.all === 'undefined') {
      return this.httpClient.get<Array<Village>>(`${this.url}/getAll`)
        .pipe(tap(villages => this.cache.all = villages));
    } else {
      return new Observable<Array<Village>>(subscriber => {
        subscriber.next(this.cache.all);
        subscriber.complete();
      });
    }
  }

  /**
   * 分页
   * @param param 查询参数
   */
  // 函数page，参数为param是一个对象，函数类型为Observable<Page<Village>>
  page(param: {
    page: number,
    size: number,
    houseType: HouseType,
    name?: string
  }): Observable<Page<Village>> {

    // 定义http请求头，添加name,page和size
    const httpParams = new HttpParams()
      .append('page', param.page.toString())
      .append('size', param.size.toString())
      .append('houseType', param.houseType)
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 VILLAGE 对象。
    return this.httpClient.get<Page<Village>>(`${this.url}/page`, {params: httpParams})
      .pipe(map(data => new Page<Village>(data).toObject(d => new Village(d))));
  }

  /**
   * 根据ID获取实体.
   * @param id id
   */
  getById(id: number): Observable<Village> {
    Assert.isNumber(id, 'id类型必须为number');
    return this.httpClient.get<Village>(`${this.url}/${id}`)
      // map()管道。在Observable的世界里，所有的管道都被习惯称为操作符。map()便是一个可以改变数据值的操作符：
      .pipe(map(data => new Village(data)));
  }

  /**
   * 更新
   * @param id id
   * @param village 小区
   */
  update(id: number, village: Village): Observable<Village> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<Village>(`${this.url}/${id}`, village)
      .pipe(map(data => new Village(data)))
      .pipe(tap(() => {
        this.clearCache();
        this.districtService.clearCache();
      }));
  }

  /**
   * 删除
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.url}/${id}`)
      .pipe(tap(() => {
        this.clearCache();
        this.districtService.clearCache();
      }));
  }

  /**
   *校验输入的小区名称是否已经存在
   */
  public existByName(name: string): Observable<boolean> { //订阅
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<boolean>(this.url + '/existByName', {params});
  }
}
