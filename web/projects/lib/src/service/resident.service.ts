import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Resident} from '../entity/resident';
import {HttpClient, HttpEventType, HttpParams, HttpProgressEvent} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';
import {filter, map, tap} from 'rxjs/operators';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';
import {AttachmentService} from './attachment.service';
import {VaccinationCache} from '../entity/vaccinationCache';
import {LoadingInterceptor} from '../../../../src/interceptor/loading.interceptor';
import {YzHttpParams} from '../modal/yz-http-params';
import {EducationType} from '../entity/enum/education-type';
import {District} from "../entity/district";
import {Village} from "../entity/village";
import {WebUserService} from "../../../../src/service/web-user.service";


/**
 * 居民服务
 */
@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private url = 'resident';
  /**
   * 所有住户缓存
   */
  private cache: {
    all: Resident[];
  };

  /**
   * 返回给c层表示需要等待导出状态码
   */
  public static WAIT_EXPORT = -1;

  /**
   * 导出结束后返回给c层等状态码，用于与等待导出区别
   */
  public static EXPORTED = -2;


  constructor(private httpClient: HttpClient,
              private attachmentService: AttachmentService,
              private userService: WebUserService) {
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
   * 添加住房
   * @param residentId 居民
   * @param houseId 房屋ID
   */
  addHouseIfNotExist(residentId: number, houseId: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/addHouseIfNotExist/${residentId}`, {}, {
      params: new HttpParams().append('houseId', houseId)
    });
  }

  delete(id: number): Observable<null> {
    Assert.isNotNullOrUndefined(id, 'ID未定义')
    return this.httpClient.delete<null>(`${this.url}/${id.toString()}`);
  }

  /**
   * 根据文件名下载文件
   * @param filename
   * @param token
   */
  downloadExcel(filename: string, token: string): void {
    this.attachmentService.downloadByFilenameAndUrl(filename,
      this.url + '/downloadExcel/' + token,
      new HttpParams());
  }

  exportToExcel(page: number, size: number, param: {
    name?: string, sex?: number, ageBegin?: number,
    ageEnd?: number, nationality?: string, religion?: string, politicalClimate?: string, phone?: string, education?: string,
    workPlace?: string, districtId?: number, idNumber?: string, beVaccinated?: boolean
  }, filename: string): Observable<number> {
    const httpParams = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('sex', param.sex)
      .append('nationality', param.nationality)
      .append('religion', param.religion)
      .append('districtId', param.districtId)
      .append('workPlace', param.workPlace)
      .append('politicalClimate', param.politicalClimate)
      .append('beginAge', param.ageBegin)
      .append('endAge', param.ageEnd)
      .append('education', param.education)
      .append('phone', param.phone)
      .append('name', param.name)
      .append('beVaccinated', param.beVaccinated)
      .append('idNumber', param.idNumber)
      .append(LoadingInterceptor.ignoreKey, 'true');
    return this.httpClient.get<String | number>(this.url + '/exportExcel', {
      params: httpParams,
      reportProgress: true,
      responseType: 'text' as 'json',
      observe: 'events'
    }).pipe(tap(data => {
        if (data.type === HttpEventType.Response) {
          // 如果返回数据类型不是json，那么不是队列长度，直接进行下载
          if (data.headers.get('content-type') !== 'application/json') {
            const token = data.body;
            this.attachmentService.downloadByFilenameAndUrl(filename,
              this.url + '/downloadExcel/' + token,
              new HttpParams());
          }
        }
      }),
      filter(data => data.type === HttpEventType.DownloadProgress),
      map(data => {
        // 如果当前进度总值小于100，则为等待下载，否则为直接下载，返回为下载进度
        const result = data as HttpProgressEvent;
        if (result.total < 100) {
          return ResidentService.WAIT_EXPORT;
        } else {
          return result.loaded;
        }
      }));
  }

  getById(residentId: number): Observable<Resident> {
    Assert.isInteger(residentId, 'residentId must be int');
    return this.httpClient.get<Resident>(`${this.url}/${residentId}`)
      .pipe(map(value => new Resident(value)));
  }

  getByIdNumber(idNumber: number): Observable<Resident | null> {
    Assert.isNotNullOrUndefined(idNumber, self.name + 'idNumber must be defined');
    return this.httpClient.get<Resident>(this.url + '/getByIdNumber/' + idNumber)
      .pipe(map(resident => resident === null ? null : new Resident(resident)));
  }

  getVaccinationCache(): Observable<VaccinationCache> {
    return this.httpClient.get<VaccinationCache>(`${this.url}/getVaccinationCache`);
  }

  page(page: number, size: number, param: {
    name?: string, sex?: number, ageBegin?: number,
    ageEnd?: number, nationality?: string, religion?: string, politicalClimate?: string, phone?: string, education?: string,
    workPlace?: string, districtId?: number, idNumber?: string, beVaccinated?: boolean
  }): Observable<Page<Resident>> {
    Assert.isInteger(page, size, '分页信息类型不正确');
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('sex', isNotNullOrUndefined(param.sex) ? param.sex.toString() : null)
      .append('nationality', isNotNullOrUndefined(param.nationality) ? param.nationality.toString() : null)
      .append('religion', isNotNullOrUndefined(param.religion) ? param.religion.toString() : '')
      .append('districtId', isNotNullOrUndefined(param.districtId) ? param.districtId.toString() : '')
      .append('workPlace', isNotNullOrUndefined(param.workPlace) ? param.workPlace.toString() : '')
      .append('politicalClimate', isNotNullOrUndefined(param.politicalClimate) ? param.politicalClimate.toString() : null)
      .append('beginAge', isNotNullOrUndefined(param.ageBegin) ? param.ageBegin.toString() : null)
      .append('endAge', isNotNullOrUndefined(param.ageEnd) ? param.ageEnd.toString() : '')
      .append('education', isNotNullOrUndefined(param.education) ? param.education.toString() : null)
      .append('phone', isNotNullOrUndefined(param.phone) ? param.phone.toString() : '')
      .append('name', isNotNullOrUndefined(param.name) ? param.name.toString() : '')
      .append('beVaccinated', param.beVaccinated)
      .append('idNumber', isNotNullOrUndefined(param.idNumber) ? param.idNumber.toString() : '')

    return this.httpClient.get<Page<Resident>>(`${this.url}/page`, {params: httpParams})
      .pipe(map(data => new Page<Resident>(data).toObject(o => new Resident(o))));
  }

  /**
   * 当前网格员管理的居民分页
   * @param page 第几页
   * @param size 每页大小
   * @param param 查询参数
   * <p>
   * nationality: 民族; religion: 宗教; politicalClimate: 政治面貌;
   */
  pageOfCurrentGrider(page: string | number, size: string | number, param: {
    name?: string,
    sex?: number,
    ageBegin?: number,
    ageEnd?: number,
    nationality?: number,
    religion?: string,
    politicalClimate?: number,
    phone?: string,
    education?: EducationType,
    workPlace?: string,
    idNumber?: string
  }) {
    const httpParams = new YzHttpParams()
      .append('page', page)
      .append('size', size)
      .append('name', param.name)
      .append('sex', param.sex)
      .append('ageBegin', param.ageBegin)
      .append('ageEnd', param.ageEnd)
      .append('nationality', param.nationality)
      .append('religion', param.religion)
      .append('politicalClimate', param.politicalClimate)
      .append('phone', param.phone)
      .append('education', param.education)
      .append('workPlace', param.workPlace)
      .append('idNumber', param.idNumber);
    return this.httpClient.get<Page<Resident>>(`${this.url}/pageOfCurrentGrider`, {params: httpParams})
      .pipe(map(data => new Page<Resident>(data).toObject(o => new Resident(o))));
  }

  /**
   * 移除居民的住房
   * @param residentId 居民
   * @param houseId 住房
   */
  removeHouse(residentId: number, houseId: number): Observable<void> {
    Assert.isInteger(residentId, houseId, '居民 ID，住房 ID 必须为int');
    const params = new HttpParams().append('houseId', houseId);
    return this.httpClient.delete<void>(`${this.url}/removeHouse/${residentId}`, {params});
  }

  /**
   * 新增居民
   * @param resident 居民
   */
  save(resident: Resident): Observable<Resident> {
    return this.httpClient.post<Resident>(this.url, resident)
      .pipe(map(resident => new Resident(resident)));
  }

  /**
   * 更新居民
   * @param id id
   * @param resident 居民
   */
  update(id: number, resident: Resident): Observable<Resident> {
    return this.httpClient.put<Resident>(`${this.url}/${id}`, resident)
      .pipe(map(resident => new Resident(resident)));
  }

  /**
   * 保存所有
   * @param residents
   */
  updateAll(residents: Resident[]): Observable<Resident[]> {
    return this.httpClient.post<Resident[]>(this.url + '/updateAll', residents)
      .pipe(tap(items => items.map(item => new Resident(item))));
  }
}
