import {
  AfterViewInit,
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import * as echarts from 'echarts';
import {DistrictDataStatisticsService} from '../../../../projects/lib/src/service/district-data-statistics.service';
import {Assert} from '@yunzhi/utils';
import {DistrictDataStatistics} from '../../../../projects/lib/src/entity/district-data-statistics';
import {EChartsType} from 'echarts';
import {District} from '../../../../projects/lib/src/entity/district';

type EChartsOption = echarts.EChartsOption;

/**
 * 子区域的居民与房屋信息
 * https://echarts.apache.org/examples/en/editor.html?c=bar1&lang=ts
 */
@Component({
  selector: 'app-house-and-resident',
  templateUrl: './house-and-resident.component.html',
  styleUrls: ['./house-and-resident.component.scss']
})
export class HouseAndResidentComponent implements OnInit, AfterViewInit {
  /**
   * 区域变更弹出
   */
  @Output()
  beDistrictChange = new EventEmitter<District>();
  @ViewChild('chart', {static: true})
  chartRef: ElementRef;
  /**
   * 区域住房与居民数量
   */
  districtHouseResidentCounts: DistrictDataStatistics[];
  echarts: EChartsType;
  @Input()
  height: string;
  option: EChartsOption = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['住房', '居民']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    calculable: true,
    xAxis: [
      {
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        type: 'category',
        // prettier-ignore
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '住房',
        type: 'bar',
        data: [],
        markLine: {
          data: [{type: 'average', name: '住房平均'}]
        }
      },
      {
        name: '居民',
        type: 'bar',
        data: [],
        markLine: {
          data: [{type: 'average', name: '居民平均'}]
        }
      }
    ]
  };
  state = {
    districtId: undefined as number
  }
  /**
   * 宽高比
   */
  @Input()
  widthHeightRatio = 16 / 9;

  constructor(private viewContainer: ViewContainerRef,
              private districtDataStatisticsService: DistrictDataStatisticsService) {
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
    this.echarts.on('click', params => {
      /**
       * 变击柱状图时，弹出对应的区域
       */
      if (params.componentType === 'series') {
        const index = params.dataIndex;
        const districtHouseResident = this.districtHouseResidentCounts[index];
        Assert.isDefined(districtHouseResident.district, '区域未定义');
        this.beDistrictChange.emit(districtHouseResident.district);
      }
    });
    this.render(this.districtId);
  }

  /**
   * 初始化图形长宽比为16:10
   */
  ngOnInit(): void {
    const chartDom = this.viewContainer.element.nativeElement as HTMLElement;
    if (chartDom.clientWidth === 0 && chartDom.parentElement !== null) {
      chartDom.style.width = chartDom.parentElement.clientWidth + 'px';
    }

    if (typeof this.height === 'undefined') {
      if (chartDom.clientWidth === 0 && chartDom.parentElement !== null) {
        this.height = chartDom.parentElement.clientWidth / this.widthHeightRatio + 'px';
      } else {
        this.height = chartDom.clientWidth / this.widthHeightRatio + 'px';
      }
    }
  }

  render(districtId: number) {
    if (this.echarts && districtId) {
      this.districtDataStatisticsService.getSonDistrictDataByDistrictId(districtId)
        .subscribe(items => {
          this.setDistrictHouseAndResidentCounts(items);
          this.echarts.setOption(this.option);
        });
    }
  }

  /**
   * 设置区域住房与居民信息
   * @param districtHouseResidentCounts  区域住房与居民数量
   */
  setDistrictHouseAndResidentCounts(districtHouseResidentCounts: DistrictDataStatistics[]) {
    // 做个缓存，用户点击柱状图时可以根据点击的index，到当前的缓存中找到对应的区域
    this.districtHouseResidentCounts = districtHouseResidentCounts;
    this.option.xAxis[0].data = [];
    this.option.series[0].data = [];
    this.option.series[1].data = [];
    districtHouseResidentCounts.forEach(districtHouseResidentCount => {
      Assert.isDefined(districtHouseResidentCount.district, '未获取到区域信息');
      this.option.xAxis[0].data.push(districtHouseResidentCount.district.name);
      this.option.series[0].data.push(districtHouseResidentCount.houseCount);
      this.option.series[1].data.push(districtHouseResidentCount.residentCount);
    });
  }
}
