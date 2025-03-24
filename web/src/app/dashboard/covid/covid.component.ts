import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import * as echarts from 'echarts';
import {DistrictDataStatisticsService} from '../../../../projects/lib/src/service/district-data-statistics.service';
import {EChartsType} from 'echarts';

type EChartsOption = echarts.EChartsOption;

/**
 * 接种和未接种饼状图
 * https://echarts.apache.org/examples/en/editor.html?c=bar1&lang=ts
 */
@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements AfterViewInit {
  @ViewChild('chart1', {static: true})
  chartRef: ElementRef;
  echarts: EChartsType;
  @Input()
  height: string;
  option: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '人数',
        type: 'pie',    // 设置图表类型为饼图
        radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
        data: [          // 数据数组，name 为数据项名称，value 为数据项值
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  state = {
    districtId: undefined as number
  }

  constructor(private districtDataStatisticsService: DistrictDataStatisticsService) {
  }

  get districtId(): number {
    return this.state.districtId;
  }

  @Input()
  set districtId(districtId: number) {
    this.state.districtId = districtId;
    this.render(districtId);
  }

  ngAfterViewInit(): void {
    this.echarts = echarts.init(this.chartRef.nativeElement);
    this.render(this.districtId);
  }

  render(districtId: number) {
    if (this.echarts && districtId) {
      this.districtDataStatisticsService.getByDistrictId(districtId)
        .subscribe(data => {
          if (data) {
            this.option.title = {
              text: Math.floor(data.covid19DefensedCount * 100 / data.residentCount).toString(10) + '%',
              left: 'center'
            };
            const vaccinated = data.covid19DefensedCount;
            const total = data.residentCount;
            this.option.series[0].data = [];
            this.option.series[0].data.push({value: vaccinated, name: '已接种'});
            this.option.series[0].data.push({value: total - vaccinated, name: '未接种'});
            this.echarts.setOption(this.option);
          }
        });
    }

  }
}
