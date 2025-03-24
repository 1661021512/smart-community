import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  DatasetComponentOption,
  GridComponent,
  GridComponentOption,
  VisualMapComponent,
  VisualMapComponentOption
} from 'echarts/components';
import {BarChart, BarSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {DatasetOption} from 'echarts/types/dist/shared';
import {UserDataStatisticsService} from '../../../../projects/lib/src/service/user-data-statistics.service';
import {WebUserDataStatistics} from '../../../../projects/lib/src/entity/web-user-data-statistics';
import {EChartsType} from 'echarts/core';
import {Assert} from '@yunzhi/utils';

echarts.use([
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  BarChart,
  CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<| DatasetComponentOption
  | GridComponentOption
  | VisualMapComponentOption
  | BarSeriesOption>;

/**
 * 数据录入统计组件
 * https://echarts.apache.org/examples/en/editor.html?c=dataset-encode0&lang=ts
 */
@Component({
  selector: 'app-data-enter',
  templateUrl: './data-enter.component.html',
  styleUrls: ['./data-enter.component.scss']
})
export class DataEnterComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', {static: true})
  chartRef: ElementRef;
  echarts: EChartsType;
  @Input()
  height: string;
  option = {
    dataset: {
      source: []
    },
    grid: {
      left: 120,
      right: 60,
      top: 5,
      bottom: 30
    },
    xAxis: {
      name: '录入量'
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        // interval: 0,
        formatter: function (value) {
          return value;
        },
      }
    },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      // 不显示下方表示数值的条
      show: false,
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#FD665F', '#FFCE34', '#65B581']
      }
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true
        },
        encode: {
          // Map the "amount" column to X axis.
          x: '录入数量',
          // Map the "product" column to Y axis
          y: '人员'
        }
      }
    ]
  } as EChartsOption;
  state = {
    districtId: null as number
  }

  constructor(private userDataStatisticsService: UserDataStatisticsService) {
  }

  get districtId(): number {
    return this.state.districtId;
  }

  @Input()
  set districtId(districtId: number) {
    Assert.isInteger(districtId, '传入的区域ID类型不正确')
    this.state.districtId = districtId;
    if (this.echarts) {
      this.render(districtId);
    }
  }

  ngAfterViewInit(): void {
    this.echarts = echarts.init(this.chartRef.nativeElement);
    if (!Number.isInteger(this.districtId)) {
      console.warn('未传入区域ID');
      return;
    }
    this.render(this.districtId);
  }

  ngOnInit(): void {
    if (typeof this.height === 'undefined') {
      this.height = '300px';
    }
    this.resetOption();
  }

  pushData(option: EChartsOption, item: WebUserDataStatistics) {
    const source = (option.dataset as DatasetOption).source as [number, string][];
    const title = item.webUser.name + '(' + item.webUser.district.name + ')';
    source.push([item.enterCount, title]);
  }

  render(districtId: number) {
    this.userDataStatisticsService.pageTop10BelongDistrictId(districtId)
      .subscribe(page => {
        this.resetOption();
        page.content.reverse().forEach(item => {
          this.pushData(this.option, item);
        })
        this.echarts.setOption(this.option);
      });
  }

  resetOption() {
    (this.option.dataset as DatasetOption).source = [
      ['录入量', '人员']
    ];
  }
}
