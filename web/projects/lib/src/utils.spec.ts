import {TestBed} from '@angular/core/testing';
import {dateStringToTimestamp, Utils} from './utils';
import {of} from 'rxjs';
import {concatMap, delay, last, tap} from 'rxjs/operators';

describe('utils', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: []
  }));

  it('convertToLoadingFormat', () => {
    expect(Utils.convertToLoadingFormat('请稍候')).toEqual('请稍候.');
    expect(Utils.convertToLoadingFormat('请稍候.')).toEqual('请稍候..');
    expect(Utils.convertToLoadingFormat('请稍候..')).toEqual('请稍候...');
    expect(Utils.convertToLoadingFormat('请稍候...')).toEqual('请稍候');
  });

  it('parseInt', () => {
    expect(Number.parseInt('123', 10)).toBe(123);
    expect(Number.isNaN(Number.parseInt('abc', 10))).toBeTrue();
  });

  it('rxjs concatMap测试', (done) => {
    const a = of(1, 2).pipe(delay(500));
    a.pipe(tap(t => console.log(t)),
      concatMap(a1 => {
        if (a1 === 1) {
          return of('2', '3', '4');
        } else {
          return of(7, 8, 9);
        }
      }),
      last())
      .subscribe(r => {
          expect(r).toBe(9);
        }, error => {
        }, () => done()
      );
  });

  it('dateStringToTimestamp', () => {
    expect(dateStringToTimestamp('2021-05-04')).toEqual(1620057600000);
  });
});
