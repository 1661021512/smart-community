import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'house'
})
export class HousePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
