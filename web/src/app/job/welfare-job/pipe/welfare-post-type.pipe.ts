import {Pipe, PipeTransform} from '@angular/core';

/**
 * 公益性岗位->岗位类型管道
 */
@Pipe({
  name: 'welfarePostType'
})
export class WelfarePostTypePipe implements PipeTransform {

  transform(value: number): string {
    if (value === undefined || value === null) {
      console.warn('接收到了空的值');
      return '-';
    }
    if (value === 0) {
      return '其他岗位';
    } else if (value === 1) {
      return '社区公共管理类岗位';
    } else if (value === 2) {
      return '城市社区公益性岗位';
    } else if (value === 3) {
      return '机关事业单位工勤保证和公共服务岗位';
    } else {
      console.warn('请传入0-3的值');
      return '-';
    }
  }

}
