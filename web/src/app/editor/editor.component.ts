import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {EditorService} from '../../../projects/lib/src/service/editor.service';
import {AttachmentService} from '../../../projects/lib/src/service/attachment.service';
import {Attachment} from '../../../projects/lib/src/entity/attachment';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {EventObj} from '@tinymce/tinymce-angular/editor/Events';
import {Editor} from 'tinymce';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MyFileService} from '../../../projects/lib/src/service/my-file.service';

/**
 * 富文本编辑器
 * https://www.tiny.cloud/docs/integrations/angular/#tinymceangularintegrationquickstartguide
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => EditorComponent)
    }
  ]
})
export class EditorComponent implements OnDestroy, OnInit, ControlValueAccessor {
  formControl = new FormControl('');
  @Input()
  height = 500;
  init: Record<string, any>;
  private editor: Editor;

  constructor(private editorService: EditorService,
              private attachmentService: AttachmentService) {
  }

  ngOnDestroy(): void {
    this.editorService.deleteComponentAddEditor(this.editor);
  }

  onEditorInit($event: EventObj<any>) {
    this.editor = $event.editor;
    this.editorService.addComponentAddEditor(this.editor, this);
  }

  registerOnChange(fn: (data: string) => void): void {
    this.formControl.valueChanges.subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: string): void {
    this.formControl.setValue(obj);
  }

  ngOnInit(): void {
    this.init = {
      base_url: '/tinymce',
      suffix: '.min',
      height: this.height,
      contextmenu: false,
      relative_urls: false,
      menubar: false,
      language: 'zh_CN',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        `insertdatetime media table paste code help wordcount ${EditorService.keys.yzImageTip}`
      ],
      // 文件上传拦截器
      images_upload_handler: (blobInfo, success, failure): void => {
        this.attachmentService.upload(blobInfo.blob())
          .subscribe((response: HttpEvent<Attachment>) => {
            if (response.type === HttpEventType.Response) {
              const attachment = response.body as Attachment
              success(MyFileService.getFullPath(attachment.file));
            }
          }, (response: HttpErrorResponse) => {
            failure('上传图片异常: ' + response.error);
          });
      },
      toolbar:
        `undo redo | formatselect | bold italic ${EditorService.keys.yzImageTip} | ` +
        'alignleft aligncenter alignright alignjustify  | ' +
        'bullist numlist outdent indent | removeformat | help',
      // 允许拖拽图片
      paste_data_images: true,
    };
  }
}
