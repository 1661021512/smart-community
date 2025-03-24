import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {interval, Observable} from 'rxjs';
import {HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent} from '@angular/common/http';
import {randomNumber} from '@yunzhi/utils';
import {map, take} from 'rxjs/operators';
import {Attachment} from '../entity/attachment';

/**
 * 附件
 */
export class AttachmentApi implements MockApiInterface {
  private url = 'attachment';

  getInjectors(): ApiInjector[] {
    return [{
      method: 'POST',
      url: this.url + '/upload',
      result: (urlMatcher: string[], option: {body: FormData}) => {
        return new Observable<HttpEvent<object>>(subscriber => {
          let i = 0;
          const total = randomNumber(10000);
          interval(20).pipe(
            take(100),
            map(() => ++i)
          ).subscribe(data => {
            subscriber.next({
              type: HttpEventType.UploadProgress,
              loaded: data * total / 100,
              total
            } as HttpUploadProgressEvent);
            if (data === 100) {
              subscriber.next({
                type: HttpEventType.Response,
                body: {
                  id: randomNumber(),
                  file: {
                    path: 'basic/image/',
                    name: 'left.png'
                  }
                } as Attachment
              } as HttpResponse<Attachment>);
              subscriber.complete();
            }
          });
        });
      }
    }];
  }
}
