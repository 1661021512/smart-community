import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Community3d} from "../entity/community3d";

/**
 * 社区3D模型 mockApi
 */
export class Community3dApi implements MockApiInterface {

  protected baseUrl = 'community3d';

  getInjectors(): ApiInjector[] {
    return [
      // 获取所有社区3D模型
      {
        method: 'GET',
        url: `${this.baseUrl}`,
        result: () => {
          const community3ds = new Array<Community3d>();
          for (let i = 0; i < 10; i++) {
            community3ds.push({
              id: i,
              name: '社区模型' + (i + 1),
            } as Community3d);
          }
          return community3ds;
        }
      }
    ]
  }
}
