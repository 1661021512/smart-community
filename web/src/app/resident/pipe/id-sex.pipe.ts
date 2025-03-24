import {Pipe, PipeTransform} from '@angular/core';

/**
 * 根据ID来推算出性别
 */
@Pipe({
  name: 'idSex'
})
export class IdSexPipe implements PipeTransform {

  transform(input: string, ...args: unknown[]): boolean {
    if (!input || input.length !== 18) {
      return null;
    }
    return +input.substr(16, 1) % 2 === 1;
  }

}
