import {Pipe, PipeTransform} from '@angular/core';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {Observable, of} from 'rxjs';
import {RelationshipService} from '../../../../projects/lib/src/service/relationship.service';
import {map, tap} from 'rxjs/operators';

/**
 * 居民间关系
 * 当前管道主的要点在于异步。
 * 核心知识点：
 * 1. Angular对V层的渲染会调用多次，以判断V层是否稳定。
 * 2. V层每渲染一次，就会重新调用一次管道。
 * 3. 要达到稳定的目的，则需要保证相同的输入值必须有相同的输出。
 * 4. 本管道的返回值是一个Observable
 * 5. 基于2,3,4，本管道要达到目的对于相同的输入，输出的Observable需要相同
 * 6. V层的值是可以发生变更的，比如由1变更成2，但此时管道还会是相同的实例
 * 7. 基于6，要保证当需要值发生变化时，可以返回新的Observable
 */
@Pipe({
  name: 'relationship', pure: false
})
export class RelationshipPipe implements PipeTransform {
  /**对于相同的输入，输出应该相同，本实例的目的在于缓存Observable*/
  private observable = new Observable<string>(subscriber => {
    subscriber.next('-');
    subscriber.complete();
  });
  /**缓存输入的居民*/
  private relationIdCache = undefined as number;
  /**缓存输入的户主*/
  private ownerIdCache = undefined as number;

  constructor(private relationshipService: RelationshipService) {
  }

  /**
   * 显示居民与户主间的关系 #537
   * 1. 户主ID未定义时，返回 -
   * 2. 户主ID与居民ID相同时，返回 户主
   * 3. 不相同时，以两个ID向后台发起请求
   * @param relationId 居民ID
   * @param args 0：户主ID
   */
  transform(relationId: number, ...args: unknown[]): Observable<string> {
    const ownerId = args[0] as number;     // 户主ID

    // 输入值与缓存值相同时，输出缓存的Observable
    if (this.ownerIdCache === ownerId && this.relationIdCache === relationId) {
      return this.observable;
    }

    // 设置缓存
    this.ownerIdCache = ownerId;
    this.relationIdCache = relationId;

    // 按不同的情况，设置Observable
    if (!isNotNullOrUndefined(ownerId) || !isNotNullOrUndefined(relationId)) {
      // 1. 户主ID未定义时，返回 -
      this.observable = of('-');
    } else if (ownerId === relationId) {
      // 2. 户主ID与居民ID相同时，返回 户主
      this.observable = of('户主');
    } else {
      // 3. 户主ID与居民ID不同时，向后台发起请求
      this.observable = this.relationshipService.getByResidentIds(relationId, ownerId)
        .pipe(map(relationsShip => {
          console.log(relationsShip);
          return relationsShip === null ? '-' : relationsShip.name;
        }), tap(v => console.log(v)));
    }

    return this.observable;
  }
}
