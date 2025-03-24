import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community3d} from "../entity/community3d";
import {map} from "rxjs/operators";

/**
 * 社区3D模型
 */
// 声明为可注入的
@Injectable({
  providedIn: 'root'
})

// 可被应用的类
export class Community3dService {

  // 定义变量并赋值
  private baseUrl = 'community3d';

  // 构造函数声明，并定义参数变量和类型
  constructor(protected httpClient: HttpClient) {
  }

  /**
   * 获取所有的社区3D模型
   */
  public getAll(): Observable<Community3d[]> {
    return this.httpClient.get<Array<Community3d>>(`${this.baseUrl}`)
      // 1.遍历返回的 community3ds 数组。 2.将数据中的每一个json对象转换为 Community3d
      .pipe(map(community3ds => community3ds.map(community3d => new Community3d(community3d))));
  }
}
