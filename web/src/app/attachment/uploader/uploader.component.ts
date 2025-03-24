import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';
import {environment} from '../../../environments/environment';
import {YzUploaderService} from '@yunzhi/ng-common';

/**
 * 上传组件
 */
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => UploaderComponent)
    }
  ]
})
export class UploaderComponent implements OnInit, ControlValueAccessor {
  /**
   * 接收的图片类型
   */
  @Input()
  accept = '.jpeg,.jpg,.gif,.png';

  formControl = new FormControl(null);

  imageUrl: string;

  /**
   * 上传文件的最大值
   */
  @Input()
  maxSize = environment.attachmentMaxSize;

  /**
   * 是否显示阅览
   */
  @Input()
  showPreview = false;

  showUploader = false;

  constructor() {
  }

  ngOnInit(): void {
    return;
  }

  onClose() {
    this.showUploader = false;
  }

  onUpload($event: {file: File; response: HttpResponse<Attachment>}) {
    this.showUploader = false;
    console.log($event.response.body);
    if (this.showPreview) {
      YzUploaderService.readerImageFileToDataURL($event.file)
        .subscribe(imageUrl => {
          this.imageUrl = imageUrl;
        });
    }

    this.formControl.setValue($event.response.body);
  }

  registerOnChange(fn: (data: Attachment | null) => void): void {
    this.formControl.valueChanges.subscribe(data => {
      fn(data);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Attachment | null): void {
    this.formControl.setValue(obj);
  }
}
