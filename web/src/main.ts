import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Assert} from '@yunzhi/utils';
import swal from 'sweetalert2';

// 重写showError
Assert.showError = (message) => {
  swal.fire({
    titleText: '发生了一个错误',
    text: message,
    icon: 'error',
    background: '#F7F8FA',
    allowOutsideClick: false,
    confirmButtonText: '确定',
    confirmButtonColor: '#007BFF',
    showCancelButton: false
  }).then();
  throw new Error(message)
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

