import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import {
  PieChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

@Component({
  selector: 'app-property-home-chart',
  templateUrl: './property-home-chart.component.html',
  styleUrls: ['./property-home-chart.component.scss']
})
export class PropertyHomeChartComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    if( !element.style.height || !element.style.width) {
      console.log('未获取到宿主元素的高度或宽度，图像可能未正常显示，请检查');
    }

    echarts.use(
      [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
    );

    const myChart = echarts.init(element);
    let option;

    option = {
      title: {
        text: '物业处理现状',
        left: 'center',
        bottom: '5px',
        textStyle: {
          color: 'white'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        backgroundColor: '#013243',
        textStyle: {
          color: '#ffffff'
        }
      },
      series: [
        {
          name: '物业处理分析',
          type: 'pie',
          // 饼的大小
          radius: '40%',
          data: [
            {value: 78, name: '未处理'},
            {value: 32, name: '已处理'},
            {value: 89, name: '处理中'},
          ],
          label: {
            formatter: '{b} \n {d}%',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999'
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }

}
