import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RectModel} from '../../../projects/lib/src/modal/rect-model';
import {D3Service} from '../../../projects/lib/src/service/d3.service';
import {Selection} from 'd3';
import {PartyBuildingService} from '../../../projects/lib/src/service/party-building.service';
import {PartyBuilding} from '../../../projects/lib/src/entity/partyBuilding';
import {Assert} from '@yunzhi/utils';
import * as d3 from 'd3';

/**
 * 动态生成组织架构图
 * 参考文档：
 * https://www.npmjs.com/package/@types/d3
 * https://www.d3-graph-gallery.com/graph/shape.html
 * https://www.npmjs.com/package/d3
 *
 */
@Component({
  templateUrl: './my-party-building.component.html',
  styleUrls: ['./my-party-building.component.scss']
})
export class MyPartyBuildingComponent implements OnInit {
  @ViewChild('main', {static: true})
  private mainElementRef: ElementRef;
  private divElement: HTMLDivElement;
  private height = 400;
  private partBuildings: PartyBuilding[];
  private partBuildingTree: PartBuildingTree;
  private svgContainer: Selection<ElementTagNameMap['svg'], unknown, null, undefined>;

  constructor(private d3Service: D3Service,
              private partBuildingService: PartyBuildingService) {
  }

  ngOnInit(): void {
    this.divElement = this.mainElementRef.nativeElement as HTMLDivElement;
    // 创建一个容器
    this.svgContainer = d3.select(this.divElement).append('svg')
      .attr('width', this.divElement.clientWidth)
      .attr('height', this.height);
    this.partBuildingService.getAllOfCurrentUserDistrict()
      .subscribe(partBuildings => this.setPartBuildings(partBuildings));
  }

  /**
   * 设置党建信息
   * @param partyBuildings 党建
   */
  setPartBuildings(partyBuildings: PartyBuilding[]): void {
    this.validate(partyBuildings);
    partyBuildings = partyBuildings.sort((a, b) => a.duty.weight - b.duty.weight);
    this.partBuildings = partyBuildings;
    if (partyBuildings.length > 0) {
      this.partBuildingTree = new PartBuildingTree(
        partyBuildings[0],
        partyBuildings.slice(1),
        this.divElement.clientWidth,
        this.height,
      );
      // 渲染树
      this.render(this.partBuildingTree);
    }
  }

  validate(partBuildings: PartyBuilding[]): void {
    Assert.isArray(partBuildings, '党建信息类型必须是数组');
    partBuildings.forEach(partBuild => {
      Assert.isDefined(partBuild.duty, '未获取到职位');
      Assert.isInteger(partBuild.duty.weight, '未获取到职位虽的权重或权重类型不正确');
    });
  }

  /**
   * 渲染
   * 1. 添加父矩形
   * 1.1 添加文本
   * 2. 添加子矩形并添加父子矩形间的连线
   * 2.1 为子矩形添加文本
   * @param partBuildingTree 党建树
   */
  render(partBuildingTree: PartBuildingTree): void {
    if (partBuildingTree) {
      this.d3Service.addRectAndPostUser(this.svgContainer,
        partBuildingTree.parentRectModel,
        partBuildingTree.parent.duty.name,
        partBuildingTree.parent.personName);

      partBuildingTree.childrenRectModels.forEach((rectModel, index) => {
        const partBuilding = partBuildingTree.children[index];
        this.d3Service.addRectAndPostUser(this.svgContainer, rectModel, partBuilding.duty.name, partBuilding.personName);
        this.d3Service.addLine(this.svgContainer, partBuildingTree.parentRectModel, rectModel);
      });
    }
  }
}

/**
 * 党建树
 */
class PartBuildingTree {
  /**
   * 长宽比
   */
  aspectRatio = 4;
  /**
   * 子
   */
  children: PartyBuilding[];
  /**
   * 子元素间的间隔倍数
   */
  childrenIntervalRate = 1.3;
  /**
   * 子矩形
   */
  childrenRectModels: RectModel[];
  /**
   * 整体的高度
   */
  height: number;
  /**
   * 父
   */
  parent: PartyBuilding;
  /**
   * 父矩形
   */
  parentRectModel: RectModel;
  /**
   * 子矩形的长与宽
   */
  rectWidthAndHeight: {width: number, height: number};
  /**
   * 整体的宽度
   */
  width: number;

  constructor(parent: PartyBuilding, children: PartyBuilding[], width: number, height: number, config = {} as {
    childrenIntervalRate?: number,
    aspectRatio?: number
  }) {
    this.parent = parent;
    this.children = children;
    this.width = width;
    this.height = height;
    if (config) {
      if (typeof config.childrenIntervalRate !== 'undefined') {
        this.childrenIntervalRate = config.childrenIntervalRate;
      }
      if (typeof config.aspectRatio !== 'undefined') {
        this.aspectRatio = config.aspectRatio;
      }
    }

    // 计算矩形长与宽
    this.rectWidthAndHeight = this.generateRectHeightAndWidth(children.length, width);

    // 实例化父矩形
    this.parentRectModel = new RectModel({
      x: (this.width - this.rectWidthAndHeight.width * 1.2) / 2,
      y: this.rectWidthAndHeight.height * 1.2 / 2,
      width: this.rectWidthAndHeight.width * 1.2,
      height: this.rectWidthAndHeight.height * 1.2,
      fill: '#F8CECC',
      stroke: '#B85450'
    });

    // 实例化子矩形
    this.childrenRectModels = [];
    const y = this.rectWidthAndHeight.height * 3 > this.height
      ? this.height - this.rectWidthAndHeight.height
      : this.rectWidthAndHeight.height * 3;
    this.children.forEach((partBuilding, index) => {
      this.childrenRectModels.push(new RectModel({
        x: this.getChildrenX(index),
        y,
        width: this.rectWidthAndHeight.width,
        height: this.rectWidthAndHeight.height,
        fill: '#D5E8D4',
        stroke: '#82B366'
      }));
    });
  }

  /**
   * 获取子矩形的x起点
   * @param index
   */
  getChildrenX(index: number): number {
    return index * this.rectWidthAndHeight.width * this.childrenIntervalRate;
  }

  /**
   * 根据子元素的个数计算子矩形的宽度
   * @param childrenCount 子元素个数
   * @param clientWidth 总宽度
   */
  generateRectHeightAndWidth(childrenCount: number, clientWidth: number): {width: number, height: number} {
    let width;

    // 宽度最大不超过1/3，否则太丑了
    if (childrenCount <= 2) {
      width = clientWidth / 3;
    } else {
      width = clientWidth / ((childrenCount - 1) * this.childrenIntervalRate + 1);
    }
    return {width: width, height: width / this.aspectRatio};
  }
}
