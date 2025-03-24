import {Attachment} from '../entity/attachment';
import {Assert} from '@yunzhi/utils';

/**
 * 图片
 */
export class ImageModel {
  private state = {
    src: null
  }
  private readonly image: Attachment;

  constructor(image: Attachment) {
    if (image) {
      Assert.isDefined(image.file, 'file不存在');
      this.state.src = image.file.path + '/' + image.file.name;
    }
    this.image = image;
  }

  get alt(): string {
    if (!this.image) {
      return '';
    }

    return this.image.name;
  }

  get src(): string {
    if (this.state.src !== null) {
      return this.state.src;
    } else {
      return '';
    }
  }

  set src(src: string) {
    this.state.src = src;
  }
}
