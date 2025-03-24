import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DistrictDataStatisticsService} from '../../../../projects/lib/src/service/district-data-statistics.service';
import * as echarts from 'echarts';
import {EChartsOption, EChartsType} from 'echarts';

/**
 * 党员占比
 */
@Component({
  selector: 'app-party-ratio',
  templateUrl: './party-ratio.component.html',
  styleUrls: ['./party-ratio.component.scss']
})
export class PartyRatioComponent implements AfterViewInit {
  @ViewChild('chart', {static: true})
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
              text: Math.floor(data.partyMemberCount * 100 / data.residentCount).toString(10) + '%',
              left: 'center'
            };
            const partyMemberCount = data.partyMemberCount;
            const total = data.residentCount;
            this.option.series[0].data = [];
            this.option.series[0].data.push({value: partyMemberCount, name: '党员'});
            this.option.series[0].data.push({value: total - partyMemberCount, name: '群众'});
            this.echarts.setOption(this.option);
          }
        });
    }
  }
}
