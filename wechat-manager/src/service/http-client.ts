import {HttpHeaders, HttpParams} from '../types';
import RequestOption = WechatMiniprogram.RequestOption;
import {Observable} from 'wx-rxjs';
import {config} from '../config';

/**
 * 封装http-client
 */
export class HttpClient {
  private api = config.api;
  private xAuthToken = '';
  private tokenKey = 'x-auth-token';

  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T>;
  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response',
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<Response<T>>;
  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'body',
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T>;
  get<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response',
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T | Response<T>> {
    return this.request<T>('GET', url, options);
  }

  post<T>(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body',
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T>;
  post<T>(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response',
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<Response<T>>;
  post<T>(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response',
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T | Response<T>> {
    return this.request<T>('POST', url, {...options, ...{body}});
  }

  request<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT', url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response',
    body?: any,
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<Response<T>>;
  request<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT', url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    body?: any,
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T>;
  request<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT', url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'body' | 'response',
    body?: any,
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }): Observable<T | Response<T>> {
    return new Observable<T | Response<T>>(s => {
      if (typeof options === 'undefined' || options === null) {
        options = {
          observe: 'body'
        };
      }

      if (typeof options.observe === 'undefined') {
        options.observe = 'body';
      }

      if (url.startsWith('http') || url.startsWith('https')) {
      } else if (!url.startsWith('/')) {
        url = '/' + url;
      }
      let queryUrl = `${this.api}${url}?`;
      const params = options.params as { [param: string]: string };
      if (typeof params !== 'undefined') {
        for (let key in params) {
          if ((typeof params[key] === 'string') || (typeof params[key] === 'number') || (typeof params[key] === 'boolean')) {
            queryUrl += key + '=' + params[key] + '&';
          }
        }
      }

      if (this.xAuthToken.length > 0) {
        options.headers = {...options.headers, ...{'x-auth-token': this.xAuthToken}};
      }

      options.headers = {...options.headers, ...{'X-Requested-With': 'XMLHttpRequest'}};
      const request = {
        url: queryUrl,
        method,
        /** 接口调用失败的回调函数(只有后台无响应时才是失败) */
        fail: (value) => {
          s.error(value);
        },
        data: options.body,
        header: options.headers,
        /** 接口调用成功的回调函数(后台有响应即是成功，不管状态码是多少) */
        success: (value) => {
          const token = value.header[this.tokenKey] as string;
          if (typeof token === 'string' && token.length > 0) {
            this.xAuthToken = token;
          }

          if (options.observe === 'response') {
            s.next({data: value.data, header: value.header, statusCode: value.statusCode} as Response<T>);
          } else {
            const code = value.statusCode;
            if (code >= 400 && code !== 401) {
              this.showError(queryUrl, method, code);
              s.error(value.data);
            } else {
              s.next(value.data as T);
            }
          }
        },
        /** 无论成功失败都会执行 */
        complete: () => {
          s.complete();
        }
      } as RequestOption;

      wx.request(request)
    });
  }

  showError(url: string, method: string, code: number) {
    setTimeout(() => wx.showModal({
      title: `网络错误`,
      showCancel: false,
      content: `欢迎您通过微信(13920618851)将此情况反馈给开发者: ${method} ${code} ${url}`
    }), 100);
  }
}

interface Response<T> {
  data: T,
  header: { [param: string]: string | number | boolean },
  statusCode: number
}

