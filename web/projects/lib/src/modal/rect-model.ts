/**
 * 矩形
 */
import {PointModel} from './point-model';

export class RectModel {
  /**
   * 填充颜色
   */
  fill = '#DAE8FC';
  /**
   * 高度
   */
  height: number;
  /**
   * 圆角半径
   */
  radii = 10;
  /**
   * 线的颜色
   */
  stroke = '#6C8EBF';
  /**
   * 宽度
   */
  width: number;
  /**
   * 左上角起点的横坐标
   */
  x: number;
  /**
   *
   */
  y: number;

  constructor(data = {} as {
    x: number,
    y: number,
    width: number,
    height: number,
    fill?: string,
    stroke?: string,
    radii?: number
  }) {
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    if (typeof data.fill !== 'undefined') {
      this.fill = data.fill;
    }
    if (typeof data.radii !== 'undefined') {
      this.radii = data.radii;
    }
    if (typeof data.stroke !== 'undefined') {
      this.stroke = data.stroke;
    }
  }

  /**
   * 获取下边中间的点的坐标
   */
  getBottomMiddlePoint(): PointModel {
    return new PointModel(this.x + this.width / 2, this.y + this.height);
  }

  /**
   * 获取上边中间位置点的坐标
   */
  getTopMiddlePoint(): PointModel {
    return new PointModel(this.x + this.width / 2, this.y);
  }
}
