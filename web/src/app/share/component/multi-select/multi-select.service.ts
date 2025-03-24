import {Observable} from 'rxjs';

/**
 * 在select中完成异步多选的接口
 * 具体实现可参考JobTypeService
 * @author panjie
 */
export interface MultiSelectService {
  /**
   * 用户在input中输入时，调用此方法。
   * 方法返回与用户输入模糊匹配的前几项值
   * 一般会返回10项或是20项，由实现类自己掌握
   * @param name 用户在INPUT中的输入值
   */
  findTopNameContains: (name: string) => Observable<{id: number, name: string}[]>;
  /**
   * 当用输入的名称在后台返回的列表中找不到时
   * 触发后台的保存功能，该功能保存用户输入的名称，并返回保存后的实体
   * @param name
   */
  save: (name: string) => Observable<{id: any, name: string}>;
  /**
   * 用户在多选列表中选择某项时，会触发该方法。
   * 该方法应该请求后台完成：最近一次使用的时间的更新
   * @param id 实体ID
   */
  updateLastUsedTime: (id: number) => Observable<void>;
}
