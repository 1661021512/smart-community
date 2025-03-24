import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {YzUploaderModule} from '@yunzhi/ng-common';
import {AttachmentService} from '../../../../../projects/lib/src/service/attachment.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../../projects/lib/src/api/api.testing.module';
import {AddModule} from './add.module';

describe('volunteer->activity->EditComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        YzUploaderModule.forRoot({
          uploaderService: AttachmentService
        }),
        ReactiveFormsModule,
        RouterTestingModule,
        AddModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
