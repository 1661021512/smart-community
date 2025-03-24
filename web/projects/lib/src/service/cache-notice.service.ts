import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {share} from 'rxjs/operators';

/**
 * 缓存通知
 * <p>
 * 所有的清空缓存的通知均由该服务发出
 * 所有应用缓存信息的服务都应该订阅该缓存通知
 */
@Injectable({
  providedIn: 'root'
})
export class CacheNoticeService {
  private clearSubject = new Subject<void>();
  public clear$ = this.clearSubject.asObservable().pipe(share());

  constructor() {
  }

  public clear() {
    this.clearSubject.next(null)
  }
}
