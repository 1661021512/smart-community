// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import swal from 'sweetalert2';
import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {Assert} from '@yunzhi/utils';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// 重写showError
Assert.showError = (message) => {
  console.log('show error');
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

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
