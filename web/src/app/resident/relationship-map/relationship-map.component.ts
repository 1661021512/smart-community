import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as echarts from 'echarts';
import {EChartsType} from 'echarts/types/dist/echarts';
import {Assert} from '@yunzhi/utils';
import {ResidentRelationshipsService} from '../../../../projects/lib/src/service/resident-relationships.service';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {ResidentRelationships} from '../../../../projects/lib/src/entity/resident-relationships';
import {CircleModel} from '../../../../projects/lib/src/modal/circle-model';

type EChartsOption = echarts.EChartsOption;

/**
 * 人物关系图
 * https://echarts.apache.org/examples/en/editor.html?c=graph
 * https://echarts.apache.org/en/option.html#series-graph
 * https://echarts.apache.org/en/option.html#series-graph.links
 */
@Component({
  selector: 'app-relationship-map',
  templateUrl: './relationship-map.component.html',
  styleUrls: ['./relationship-map.component.scss']
})
export class RelationshipMapComponent implements AfterViewInit {
  @Output()
  beResidentIdChange = new EventEmitter<number>();
  @ViewChild('charts', {static: true})
  private chartRef: ElementRef<HTMLElement>;
  private echarts: EChartsType;
  private option: EChartsOption;
  private resident: Resident;

  private graph: {
    nodes: {
      id: string,
      name: string,
      symbolSize: number,
      x: number,
      y: number,
      label?: any,
      category: number,
      tooltip?: any
    }[];
    links: any[],
    categories: {
      name: string
    }[]
  };

  private state = {
    residentId: null as number
  };

  constructor(private residentService: ResidentService,
              private residentRelationshipsService: ResidentRelationshipsService) {
  }

  get residentId(): number {
    return this.state.residentId;
  }

  @Input()
  set residentId(residentId: number) {
    this.state.residentId = residentId;
    this.render();
  }

  initData() {
    this.graph = {
      nodes: [],
      links: [],
      categories: []
    };
  }

  ngAfterViewInit(): void {
    this.echarts = echarts.init(this.chartRef.nativeElement);

    this.echarts.on('click', params => {
      const resident = params.data as {id: string};
      if (+resident.id !== this.resident.id) {
        this.beResidentIdChange.next(+resident.id);
      }
    });

    this.render();
  }

  setData(resident: Resident, residentRelationships: ResidentRelationships[]) {
    Assert.isDefined(resident.id, resident.name, '居民信息校验错误');
    const circleCenter = {x: 50, y: 50};
    this.graph.nodes.push({
      id: resident.id.toString(10),
      name: resident.name,
      symbolSize: 30,
      x: circleCenter.x,
      y: circleCenter.y,
      category: 0,
      label: {
        show: true,
        position: 'left',
        distance: 5
      },
      tooltip: {
        formatter: '',
      }
    });
    const circleModel = new CircleModel(circleCenter.x, circleCenter.y, 50, residentRelationships, 10);
    circleModel.getNodes().forEach((node, key) => {
      const value = node.content;
      Assert.isDefined(value.anotherResident, value.id, value.relationship, RelationshipMapComponent.name + '基本属性校验错误');
      Assert.isDefined(value.anotherResident.id, value.anotherResident.name, RelationshipMapComponent.name + '对端居民基本属性获取错误');

      this.graph.nodes.push({
        id: value.anotherResident.id.toString(10),
        name: value.anotherResident.name,
        symbolSize: 10,
        x: node.x,
        y: node.y,
        category: key,
        label: {
          show: true,
          position: 'left',
          distance: 5
        },
        tooltip: {
          formatter: '',
        }
      });

      this.graph.links.push({
        id: value.id,
        source: resident.id.toString(10),
        target: value.anotherResident.id.toString(10),
        value: value.relationship.name,
        label: {
          show: true
        },
        tooltip: {
          show: true
        }
      });

      this.graph.categories.push({
        name: value.relationship.name
      });
    })

    this.echarts.hideLoading();

    this.option = {
      tooltip: {},
      // 动画时间
      animationDuration: 1500,
      series: [
        {
          name: '居民关系',
          type: 'graph',
          layout: 'none',
          data: this.graph.nodes,
          links: this.graph.links,
          categories: this.graph.categories,
          // 滚轮放大与缩小
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          // 高亮显示
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          }
        }
      ]
    };

    this.echarts.setOption(this.option);
  }

  public render(): void {
    if (this.echarts && this.residentId) {
      const residentId = this.residentId;
      Assert.isInteger(residentId, '接收到了错误的人员ID');
      this.initData();
      this.echarts.showLoading();
      this.residentService.getById(residentId)
        .subscribe(resident => {
          this.resident = resident;
          this.residentRelationshipsService.getFromAllByResidentId(residentId)
            .subscribe(residentRelationships => {
              this.setData(resident, residentRelationships);
            });
        });
    }
  }
}
