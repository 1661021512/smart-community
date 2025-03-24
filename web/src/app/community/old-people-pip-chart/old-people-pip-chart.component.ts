import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  GridComponent, TitleComponent,
  VisualMapComponent
} from 'echarts/components';
import {
  BarChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';
import {color} from "echarts";

/**
 * 老年人分布柱状图
 */
@Component({
  selector: 'app-old-people-pip-chart',
  templateUrl: './old-people-pip-chart.component.html',
  styleUrls: ['./old-people-pip-chart.component.scss']
})
export class OldPeoplePipChartComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    if (!element.style.height || !element.style.width) {
      console.log('未获取到宿主元素的高度或宽度，图像可能未正常显示，请检查');
    }

    echarts.use(
      [DatasetComponent,
        TitleComponent,
        GridComponent, VisualMapComponent, BarChart, CanvasRenderer]
    );
    const myChart = echarts.init(element);
    let option;

    option = {
      title: {
        text: '各年龄段人数分布',
        left: 'center',
        bottom: '5px',
        textStyle: {
          color: '#ffffff'
        }
      },
      dataset: {
        source: [
          ['score', 'amount', 'product'],
          [15, 120, '60-65'],
          [25, 130, '65-70'],
          [35, 180, '70-75'],
          [50, 200, '75-80'],
          [65, 50, '80-85'],
          [74, 59, '85-90'],
          [90, 29, '95-'],
        ],
      },
      grid: {containLabel: true},
      xAxis: {name: 'amount'},
      yAxis: {type: 'category'},
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        top: '3%',
        min: 10,
        max: 100,
        text: ['95-', '60',],
        textStyle: {
          color: '#ffffff'
        },
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ['#65B581', '#FFCE34', '#FD665F']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: 'amount',
            // Map the "product" column to Y axis
            y: 'product',
          },
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'right', //在上方显示
                textStyle: { //数值样式
                  color: '#ffffff',
                  fontSize: 12
                }
              }
            }
          },
        }
      ]
    };

    option && myChart.setOption(option);

  }

}
