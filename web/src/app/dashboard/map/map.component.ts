import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';
import * as echarts from 'echarts';
import {
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
  VisualMapComponentOption,
  GeoComponentOption
} from 'echarts/components';
import {MapSeriesOption} from 'echarts/charts';
import {EChartsType} from 'echarts';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {randomNumber} from '@yunzhi/utils';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {GeoJson} from '../../../../projects/lib/src/entity/geo-json';

type EChartsOption = echarts.ComposeOption<| TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
  | GeoComponentOption
  | MapSeriesOption>;

/**
 * 地图
 * https://echarts.apache.org/examples/en/editor.html?c=map-HK&lang=ts
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => MapComponent)
    }
  ]
})
export class MapComponent implements AfterViewInit, ControlValueAccessor {
  @Output()
  beDistrictIdChange = new EventEmitter<number>();
  @ViewChild('chart', {static: true})
  chartRef: ElementRef;
  districtIdFormControl = new FormControl();
  echarts: EChartsType;
  @Input()
  height: string;
  option = {
    visualMap: {
      min: 0, // 最小值
      max: 200, // 最大值
      text: ['200', '0'],
      realtime: false,
      calculable: false,
      show: false,
      inRange: {
        color: ['#e6f7ff', '#6b9dce', '#4f90df'] // 渐变颜色
      }
    },
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{b}<br/>{c} (p / km2)'
    // },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'shangyi',
        type: 'map',
        map: 'shangyi',
        label: {
          show: true
        },
        data: [] as {id: number, name: string, value: number}[]
      }
    ]
  } as EChartsOption;

  constructor(private districtService: DistrictService) {
  }

  @Input()
  set districtId(districtId: number) {
    this.districtIdFormControl.setValue(districtId);
  }

  ngAfterViewInit(): void {
    if (typeof this.height === 'undefined') {
      this.height = '600px';
    }

    this.echarts = echarts.init(this.chartRef.nativeElement);
    this.echarts.on('click', params => {
      const districtId = (params.data as {id: number}).id;
      if (this.districtIdFormControl.value !== districtId) {
        this.districtIdFormControl.setValue(districtId);
      }
    });

    this.districtIdFormControl.valueChanges.subscribe(id => {
      this.beDistrictIdChange.emit(id);
      this.render(id);
    });

    this.render(this.districtIdFormControl.value);
  }

  registerOnChange(fn: (districtId: number) => void): void {
    this.districtIdFormControl.valueChanges.subscribe(data => {
      fn(data);
    });
  }

  registerOnTouched(fn: () => void): void {
    return;
  }

  writeValue(districtId: number): void {
    this.districtIdFormControl.setValue(districtId);
  }

  render(districtId: number) {
    if (this.echarts && districtId) {
      this.echarts.showLoading();
      this.districtService.getGeoJsonById(districtId)
        .subscribe(geoJson => {
          this.echarts.hideLoading();
          this.setOptionData(geoJson);
        });
    }
  }

  /**
   * 设置echart数据
   * @param geoJson 地图数据
   */
  setOptionData(geoJson: GeoJson) {
    this.option.series[0].data = [];
    geoJson.features.forEach(feature => {
      const data = {
        id: feature.properties.district.id,
        name: feature.properties.name,
        value: randomNumber(200)
      }
      this.option.series[0].data.push(data);
    });

    echarts.registerMap('shangyi', geoJson as any);

    this.echarts.setOption(
      this.option
    );
  }
}
