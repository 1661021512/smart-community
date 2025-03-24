import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Content} from '../entity/content';
import {HttpClient} from '@angular/common/http';

/**
 * 内容服务(存某些网页)
 */
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private url = 'content';

  constructor(private httpClient: HttpClient) {
  }

  existsByKeyword(keyword: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.url + '/existsByKeyword/' + keyword);
  }

  getByKeyword(keyword: string): Observable<Content> {
    return this.httpClient.get<Content>(this.url + '/getByKeyword/' + keyword);
  }

  save(content: {title: string; content: string}): Observable<Content> {
    return this.httpClient.post<Content>(this.url, content);
  }

  updateById(id: number, content: {title: string; content: string}): Observable<Content> {
    return this.httpClient.put<Content>(this.url + '/' + id, content);
  }
}
