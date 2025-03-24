import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent, TitleComponent
} from 'echarts/components';
import {
  BarChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

@Component({
  selector: 'app-community-work-chart',
  templateUrl: './community-work-chart.component.html',
  styleUrls: ['./community-work-chart.component.scss']
})
export class CommunityWorkChartComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    if (!element.style.height || !element.style.width) {
      console.log('未获取到宿主元素的高度或宽度，图像可能未正常显示，请检查');
    }

    echarts.use(
      [DatasetComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        BarChart,
        TitleComponent,
        CanvasRenderer]
    );

    const myChart = echarts.init(element);
    let option;

    option = {
      title: {
        text: '社区工作统计',
        left: 'center',
        bottom: '5px',
        textStyle: {
          color: 'white'
        }
      },
      legend: {
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {},
      dataset: {
        source: [
          ['product', '走访量', '受理量'],
          ['6月', 43, 85],
          ['7月', 83, 73],
          ['8月', 86, 65],
        ]
      },
      textStyle: {
        color: '#ffffff'
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#ffffff',
                  fontSize: 12
                }
              }
            }
          }
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#ffffff',
                  fontSize: 12
                }
              }
            }
          }
        },
      ]
    };

    option && myChart.setOption(option);
  }

}
