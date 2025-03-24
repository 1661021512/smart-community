import {IonContent} from '@ionic/angular';
import {from, Observable} from 'rxjs';

/**
 * 是否滚动到最后
 * @param ionContent IonContent
 */
export const isScrollToEnd = (ionContent: IonContent): Observable<boolean> => {
  return new Observable<boolean>(subscriber => {
    from(ionContent.getScrollElement())
      .subscribe(scrollElement => {
        if (scrollElement.scrollTop + 1 >=
          scrollElement.scrollHeight - scrollElement.clientHeight) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
        subscriber.complete();
      });
  });
}
