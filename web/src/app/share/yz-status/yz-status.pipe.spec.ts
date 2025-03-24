import {YzStatusPipe} from './yz-status.pipe';
import {Component, Pipe, PipeTransform} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StatusEnum} from '../../../../projects/lib/src/entity/enum/statusEnum';
import {DomSanitizer} from '@angular/platform-browser';

type EducationType = 0 | 1 | 2 | 3;
const EDUCATION_TYPE: { [key: string]: StatusEnum<EducationType> } = {
  junior_high_school_and_below: {
    value: 0,
    description: '初中及以下',
    clazz: 'primary'
  },
  high_school: {
    value: 1,
    description: '高中',
  },
  college: {
    value: 2,
    description: '大学专科',
  },
  bachelor_degree_and_above: {
    value: 3,
    description: '大学本科及以上',
  },
};


/**
 * 直接对管道做继承即可
 * 构造函数传入的第二个变量类型为
 * { [key: string]: StatusEnum<T>
 */
@Pipe({
  name: 'yzStatus'
})
class StatusPipe extends YzStatusPipe<EducationType> implements PipeTransform {
  constructor(domSanitizer: DomSanitizer) {
    super(domSanitizer, EDUCATION_TYPE);
  }
}

/**
 * 两种使用方式：
 * 1. 直接使用，此时应该设置第一个参数，参数值为true
 * 2. 做为innerHTML使用
 */
@Component({
  template: `<h1>{{1 | yzStatus: true}}</h1>
  <h2 [innerHTML]="1 | yzStatus"></h2>
  <h3 [innerHTML]="0 | yzStatus"></h3>
  `
})
class TestComponent {
}


describe('share -> YzStatusPipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, StatusPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(component).toBeTruthy();
  });
});

