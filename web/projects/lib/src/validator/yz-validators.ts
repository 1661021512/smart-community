import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isNotNullOrUndefined} from '@yunzhi/utils';

/**
 * 验证器
 */
export class YzValidators {
  /**
   * 数组最小长度
   * @param minLength 最小长度
   */
  static arrayMinLength(minLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      const array = control.value as [];
      if (!Array.isArray(array)) {
        return {'yzArrayMinLength': '类型不正确'}
      }

      if (array.length < minLength) {
        return {'yzArrayMinLength': '数组长度未满足最小值' + minLength};
      }

      return null;
    }
  }

  /**
   * 身份证号格式校验
   * # 430
   * @param control 表单控制器
   * @author Wang-Haodong
   * @return 通过 null, 不通过：{isNumber: '身份证号校验失败'}
   */
  static isChinaIdCardNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNotNullOrUndefined(value) && checkCode(value)) {
      let date = value.substring(6, 14);
      if (checkDate(date) && checkPro(value.substring(0, 2))) {
        return null;
      }
    }
    return {isNumber: '身份证号校验失败'};
  }

  /**
   * 中国的手机号校验
   * #431
   * @param control 表单控制器
   * @return 通过null,不通过：{isChinaMobileNumber: '手机号校验错误'}
   * author Li-Mingao
   */
  static isChinaMobileNumber(control: AbstractControl): ValidationErrors | null {
    let phone = control.value;
    if (phone) {
      if (Number.isInteger(phone)) {
        phone = phone.toString();
      }
      if (phone.length === 11) {
        if (checkPhone(phone)) {
          return null;
        }
      }
    }

    return {isChinaMobileNumber: '手机号校验错误'};
  }

  /**
   * 车辆管理
   * 验证所输入车主是否是已有居民
   * 该FromControl作用于app-resident-auto-complete组件
   * @param control 表单控制器
   */
  static ownerExist(control: AbstractControl): ValidationErrors | null {
    // 当id不为空时，说明app-resident-auto-complete组件返回的是已有的居民
    // 否则用户输入的居民不存在
    const owner = control.value;
    if (owner) {
      return (owner.id !== null) ? null : {owner: '输入的居民不存在'};
    } else {
      return {owner: '输入的居民不存在'};
    }
  }

  static isInteger(control: AbstractControl): ValidationErrors | null {
    let number = control.value;
    if (Number.isInteger(number)) {
      return null;
    }
    if(checkNumber(number)) {
      return null
    }
    return {isInteger: '整数校验错误'}
  }
}

/**
 * 检验身份证最后一位
 * @author Wang-Haodong
 * @param val
 */
function checkCode(val: string) {
  let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  // 17 位加权因子
  let divisor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码列表mod11,对应校验码字符值
  let validCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  // 定义最后一位进行判断
  let val17 = val[17];
  if (!reg.test(val)) {
    return false;
  } else {
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      // 17位每一位数 乘以加权因子 的 和
      sum += Number.parseInt(val[i]) * divisor[i];
    }
    let index = sum % 11;
    // 判断17位为'x'时进行转换为大写'X'
    if (val[17] === 'x') {
      val17 = 'X';
    }
    return validCode[index].toUpperCase() === val17;
  }
}

/**
 * 检查日期
 * @author Wang-Haodong
 * @param val
 */
function checkDate(val: string) {
  const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
  if (pattern.test(val)) {
    const year = val.substring(0, 4);
    const month = val.substring(4, 6);
    const date = val.substring(6, 8);
    const date2 = new Date(year + '-' + month + '-' + date);
    return date2 && date2.getMonth() === (parseInt(month) - 1);
  }
  return false;
}

/**
 * 检查省市编号
 * @author Wang-Haodong
 * @param val
 */
function checkPro(val: string) {
  const pattern = /^[1-9][0-9]/;
  const provs = {
    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ',
    31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ',
    43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ',
    61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门'
  };
  if (pattern.test(val)) {
    return !!provs[val];
  }
  return false;
}

/**
 * 中国的手机号校验
 * #431
 * author Li-Mingao
 */
function checkPhone(val: string) {
  const myReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  return myReg.test(val);
}

/**
 * 校验是否为整数
 */
function checkNumber(val: string) {
  const myReg =  /^[-]?[\.\d]+$/;
  return myReg.test(val);
}
