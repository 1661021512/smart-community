import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {randomString} from '@yunzhi/utils';
import {Content} from '../entity/content';

export class ContentApi implements MockApiInterface {
  protected url = 'content';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.url + '/existsByKeyword/(\\w+)',
        result: false
      }, {
        url: this.url + '/getByKeyword/(\\w+)',
        result: {
          title: randomString('标题'),
          content: '<p><b>这是html</b></p>'
        } as Content
      }
    ];
  }

}
