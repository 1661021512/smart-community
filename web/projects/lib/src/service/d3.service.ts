import {Injectable} from '@angular/core';
import {RectModel} from '../modal/rect-model';
import {Path, Selection} from 'd3';
import * as d3 from 'd3';
import {PointModel} from '../modal/point-model';

/**
 * D3相关服务
 */
@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() {
  }

  /**
   * 在两个矩形间连线
   * 官方文档：https://observablehq.com/@d3/d3-path
   * @param svgContainer SVG容器
   * @param sourceRect 起始矩形
   * @param targetRect 目标矩形
   * @param stroke 线的颜色
   */
  addLine(svgContainer: Selection<ElementTagNameMap['svg'], unknown, null, undefined>, sourceRect: RectModel, targetRect: RectModel, stroke = '#82B366') {
    svgContainer.append('path')
      .style('stroke', stroke)
      .style('fill', 'none')
      .attr('d', this.draw(d3.path(), sourceRect.getBottomMiddlePoint(), targetRect.getTopMiddlePoint()));
  }

  /**
   * 添加矩形
   * @param svgContainer SVG容器
   * @param rectModel 矩形
   */
  addRect(svgContainer: Selection<ElementTagNameMap['svg'], unknown, null, undefined>, rectModel: RectModel): void {
    svgContainer.append('rect')
      .attr('rx', rectModel.radii)
      .attr('x', rectModel.x)
      .attr('y', rectModel.y)
      .attr('width', rectModel.width)
      .attr('height', rectModel.height)
      .attr('stroke', rectModel.stroke)
      .attr('fill', rectModel.fill);

  }

  /**
   * 添加矩形以及岗位名称、用户姓名
   * @param svgContainer SVG容器
   * @param rectModel 矩形
   * @param postName 岗位名称
   * @param userName 用户名称
   */
  addRectAndPostUser(svgContainer: Selection<ElementTagNameMap['svg'], unknown, null, undefined>,
                     rectModel: RectModel,
                     postName: string,
                     userName: string): void {
    this.addRect(svgContainer, rectModel);
    const fontSize = Math.floor(rectModel.height / 3);
    const y = this.addText(svgContainer, postName, fontSize - 2, rectModel.x, rectModel.y, rectModel.width,
       {color: '#555555'});
    this.addText(svgContainer, userName, fontSize, rectModel.x, y, rectModel.width);
  }

  /**
   * 添加文本
   * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/text
   * https://stackoverflow.com/questions/1636842/svg-get-text-element-width
   * https://stackoverflow.com/questions/20644415/d3-appending-text-to-a-svg-rectangle
   * @param svgContainer  SVG容器
   * @param text 文本内容
   * @param fontSize 字体大小
   * @param x X
   * @param y Y
   * @param parentContainerWidth 父容器宽度
   * @param config lineHeightRate:行高， color: 文字颜色
   * @return 继续写下一行文本时的坐标Y点
   */
  addText(svgContainer: Selection<ElementTagNameMap['svg'], unknown, null, undefined>,
          text: string,
          fontSize: number,
          x: number,
          y: number,
          parentContainerWidth: number,
          config = {
          } as {lineHeightRate?: number, color?: string}): number {
    const color = config.color ? config.color : '#000000';
    const lineHeightRate = config.lineHeightRate ? config.lineHeightRate : 1.5;
    const style = `font-size:${fontSize}px;
     line-height: ${fontSize * lineHeightRate}; fill: ${color}`;
    const textElement = svgContainer.append('text')
      .attr('x', x)
      .attr('dy', fontSize)
      .attr('y', y)
      .attr('style', style)
      .text(text) as Selection<SVGTextElement, unknown, null, undefined>;
    // 文字居中
    textElement.attr('x', x + (parentContainerWidth - textElement.node().getBBox().width) / 2);
    return y + fontSize * lineHeightRate;
  }

  /**
   * 在两个矩形间画线。
   * 官方文档：https://observablehq.com/@d3/d3-path
   * @param context D3.PATH
   * @param source 源矩形
   * @param target 目标矩形
   * @param radian 弧度
   */
  draw(context: Path, source: PointModel, target: PointModel, radian = 8): any {
    context.moveTo(source.x, source.y);
    if (Math.abs(source.x - target.x) < radian) {
      // 子和父的位置差不多，直接画下去
      context.lineTo(source.x, target.y);
    } else {
      // 开始画弧度
      const middlePoint = new PointModel(source.x, (source.y + target.y) / 2);
      context.lineTo(middlePoint.x, middlePoint.y - radian);
      const isLeft = source.x - target.x > 0;
      if (isLeft) {
        // 子位于父的左侧
        context.arc(middlePoint.x - radian, middlePoint.y - radian, radian, 0, Math.PI * 0.5);
        context.lineTo(target.x + radian, middlePoint.y);
        context.arc(target.x + radian, middlePoint.y + radian, radian, Math.PI * 1.5, Math.PI, true);
        context.lineTo(target.x, target.y);
      } else {
        // 子位于父的右侧
        context.arc(middlePoint.x + radian, middlePoint.y - radian, radian, Math.PI, Math.PI * 0.5, true);
        context.lineTo(target.x - radian, middlePoint.y);
        context.arc(target.x - radian, middlePoint.y + radian, radian, Math.PI * 1.5, Math.PI * 2, false);
        context.lineTo(target.x, target.y);
      }
    }
    return context;
  }
}
