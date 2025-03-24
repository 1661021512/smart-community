import {Assert, randomNumber} from '@yunzhi/utils';

/**
 * 圆型分布的模型
 */
export class CircleModel<T> {
  private readonly nodes: {x: number, y: number, content: T}[];

  /**
   * 构造函数
   * 将传入的数组在圆上平均分布
   * @param x x
   * @param y y
   * @param r 半径
   * @param nodes 节点
   * @param shake 抖动大小,节点的位置将在抖动大小范围随机抖动
   */
  constructor(x: number,
              y: number,
              r: number,
              nodes: T[],
              shake: number) {
    Assert.isArray(nodes, CircleModel.name + 'nodes类型必须是数组');
    const beginRadian = randomNumber(2 * Math.PI);
    this.nodes = [];
    nodes.forEach((node, index) => {
      const radian = beginRadian + index * Math.PI * 2 / nodes.length;
      this.nodes.push({
        x: x + r * Math.cos(radian) + randomNumber(shake),
        y: y + r * Math.sin(radian) + randomNumber(shake),
        content: node
      });
    })
  }

  getNodes(): {x: number, y: number, content: T}[] {
    return this.nodes;
  }
}
