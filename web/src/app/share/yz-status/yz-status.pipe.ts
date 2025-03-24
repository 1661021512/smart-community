import {PipeTransform} from '@angular/core';
import {StatusEnum} from './status-enum';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * 状态管道
 * 使用方法详见单元测试文件
 */
export abstract class YzStatusPipe<T> implements PipeTransform {
  /**
   * 占用符，占输入的状态值未在预期范围以内时
   */
  private readonly placeholder: string;
  /**
   * 所有的状态
   */
  private readonly statuses: { [key: string]: StatusEnum<T> };
  /**
   * Dom消毒剂(Angular认为动态的添加html是不安全的，所以在添加加需要进行消毒，以避免代码不小心破坏DOM)
   */
  private readonly domSanitizer: DomSanitizer;
  /**
   * 默认的样式
   */
  private readonly defaultClazz: string;

  /**
   * constructor
   * @param domSanitizer Dom消毒剂(Angular认为动态的添加html是不安全的，所以在添加加需要进行消毒，以避免代码不小心破坏DOM)
   * @param statuses 所有的状态
   * @param placeholder 当未找到状态对应的显示值时，显示的提示信息
   * @param defaultClazz 未设置相关的样式时的默认样式
   */
  protected constructor(domSanitizer: DomSanitizer, statuses: { [key: string]: StatusEnum<T> },
                        placeholder = '-',
                        defaultClazz = 'light') {
    this.domSanitizer = domSanitizer;
    this.statuses = statuses;
    this.placeholder = placeholder;
    this.defaultClazz = defaultClazz;
  }

  transform(status: T, ...args: unknown[]): string | SafeHtml {
    let result: StatusEnum<T>;
    for (let key in this.statuses) {
      const value = this.statuses[key] as StatusEnum<T>;
      if (value.value === status) {
        result = value;
        break;
      }
    }

    // 未找到时在控制台打印异常
    if (typeof result === 'undefined') {
      console.error(`未找到值为${status}的状态值`);
      return this.placeholder;
    }

    // 判断是否为简单模式
    const sample = args[0] as boolean;
    if (sample) {
      return result.description;
    } else {
      let clazz = result.clazz ? result.clazz : this.defaultClazz;
      const htmlSnippet = `<span class='badge badge-pill badge-${clazz}'>${result.description}</span>`;
      return this.domSanitizer.bypassSecurityTrustHtml(htmlSnippet);
    }
  }
}
