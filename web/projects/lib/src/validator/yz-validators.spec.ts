import {YzValidators} from './yz-validators';
import {FormControl} from '@angular/forms';

describe('validator -> YzValidators', () => {
  it('should create an instance', () => {
    expect(new YzValidators()).toBeTruthy();
  });

  it('isNumber', () => {
    // 断言正确的身份证号返回null，错误的返回{isNumber: '身份证号校验失败'}
    console.log('身份验证测试');
    const formControl = new FormControl('51132219951106437x');
    YzValidators.isChinaIdCardNumber(formControl);
  });

  it('isChinaMobileNumber', () => {
    // 正确的手机号返回null，错误的按要求返回
    let formControl = new FormControl(13209890980);
    expect(YzValidators.isChinaMobileNumber(formControl)).toBeNull();

    formControl = new FormControl(13131693956);
    expect(YzValidators.isChinaMobileNumber(formControl)).toBeNull();

    formControl = new FormControl(12345678910);
    console.log(YzValidators.isChinaMobileNumber(formControl));
    expect(YzValidators.isChinaMobileNumber(formControl)).toEqual({
      "isChinaMobileNumber": "手机号校验错误"
    });

    formControl = new FormControl(111);
    expect(YzValidators.isChinaMobileNumber(formControl)).toEqual({
      "isChinaMobileNumber": "手机号校验错误"
    });

  });
});
