import { YzAsyncValidators } from './yz-async-validators';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {ApiTestingModule} from '../api/api.testing.module';

describe('YzAsyncValidators', () => {
  it('should create an instance', async () => {
    // 配置动态测试模块
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiTestingModule
      ]
    });
  });
});
