import {Pipe, PipeTransform} from '@angular/core';
import {Attachment} from '../../../entity/attachment';

/**
 * a图片的URL地址
 */
@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(attachment: Attachment, ...args: unknown[]): string {
    if (attachment && attachment.file) {
      return attachment.file.path + '/' + attachment.file.name;
    } else {
      return '';
    }
  }
}
