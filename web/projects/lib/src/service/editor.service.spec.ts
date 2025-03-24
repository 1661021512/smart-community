import {TestBed} from '@angular/core/testing';

import {EditorService} from './editor.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('EditorService', () => {
  let service: EditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(EditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
