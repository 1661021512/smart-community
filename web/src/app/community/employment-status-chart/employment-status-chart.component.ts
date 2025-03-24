import {AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import {
  LineChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

/**
 * 就业情况折线图
 */
@Component({
  selector: 'app-employment-status-chart',
  templateUrl: './employment-status-chart.component.html',
  styleUrls: ['./employment-status-chart.component.scss']
})
export class EmploymentStatusChartComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;
    if (!element.style.height || !element.style.width){
      console.log('未获取到宿主元素的高度或宽度，图像可能未正常显示，请检查');
    }

    echarts.use(
      [TitleComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
    );
    const myChart = echarts.init(element);
    let option;

    option = {
      title: {
        text: '就业情况统计',
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
      textStyle: {
        color: '#ffffff'
      },
      xAxis: {
        type: 'category',
        data: ['三月', '四月', '五月', '六月', '七月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [106, 172, 150, 202, 145],
        type: 'line',
        color: ["#98FB98"],
      }]
    };

    option && myChart.setOption(option);
  }

}
