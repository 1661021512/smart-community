import {AttachmentService} from './attachment.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AttachmentStubService extends AttachmentService {
  prefix = 'assets/'

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
