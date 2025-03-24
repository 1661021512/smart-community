import {Pipe, PipeTransform} from '@angular/core';

/**
 * 车身颜色管道
 */
@Pipe({
  name: 'vehicleColor'
})
export class VehicleColorPipe implements PipeTransform {

  transform(value: number): string {
    if (value === undefined || value === null) {
      console.warn('接收到了空的值');
      return '-';
    }
    switch (value) {
      case 0:
        return '白色';
      case 1:
        return '黑色';
      case 2:
        return '黄色';
      case 3:
        return '粉色';
      case 4:
        return '红色';
      case 5:
        return '紫色';
      case 6:
        return '绿色';
      case 7:
        return '蓝色';
      case 8:
        return '棕色';
      case 9:
        return '灰色';
    }
    return '-';
  }
}
