import {HttpParams} from '@angular/common/http';

describe('yzHttpParams', () => {
  it('测试HttpParams对null及undefined的处理', () => {
    let httpParams = new HttpParams().append('name', null);
    expect(httpParams.has('name')).toBeTrue();
    console.log(httpParams.get('name'));
    httpParams = new HttpParams().append('test', undefined);
    expect(httpParams.get('test')).toEqual('undefined');
    expect(httpParams.has('test')).toBeTrue();
    expect(httpParams.has('test1')).toBeFalse();
  });
});
