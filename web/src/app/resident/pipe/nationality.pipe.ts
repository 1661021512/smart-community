import {Pipe, PipeTransform} from '@angular/core';

/**
 * 民族管道
 * #412
 */
@Pipe({
  name: 'nationality'
})
export class NationalityPipe implements PipeTransform {

  transform(value: number): string {
    if (value === undefined || value === null){
      console.warn('接收到了空的值');
      return '-';
    }
    if (value === 1){
      return '汉族';
    }else if (value === 2){
      return '蒙古族';
    }else if (value === 3){
      return '回族';
    }else if (value === 4){
      return '藏族';
    }else if (value === 5){
      return '维吾尔族';
    }else if (value === 6){
      return '苗族';
    }else if (value === 7){
      return '彝族';
    }else if (value === 8){
      return '壮族';
    }else if (value === 9){
      return '布依族';
    }else if (value === 10){
      return '朝鲜族';
    }else if (value === 11){
      return '满族';
    }else if (value === 12){
      return '侗族';
    }else if (value === 13){
      return '瑶族';
    }else if (value === 14){
      return '白族';
    }else if (value === 15){
      return '土家族';
    }else if (value === 16){
      return '哈尼族';
    }else if (value === 17){
      return '哈萨克族';
    }else if (value === 18){
      return '傣族';
    }else if (value === 19){
      return '黎族';
    }else if (value === 20){
      return '傈僳族';
    }else if (value === 21){
      return '佤族';
    }else if (value === 22){
      return '畲族';
    }else if (value === 23){
      return '高山族';
    }else if (value === 24){
      return '拉祜族';
    }else if (value === 25){
      return '水族';
    }else if (value === 26){
      return '东乡族';
    }else if (value === 27){
      return '纳西族';
    }else if (value === 28){
      return '景颇族';
    }else if (value === 29){
      return '柯尔克孜族';
    }else if (value === 30){
      return '土族';
    }else if (value === 31){
      return '达斡尔族';
    }else if (value === 32){
      return '仫佬族';
    }else if (value === 33){
      return '羌族';
    }else if (value === 34){
      return '布朗族';
    }else if (value === 35){
      return '撒拉族';
    }else if (value === 36){
      return '毛南族';
    }else if (value === 37){
      return '仡佬族';
    }else if (value === 38){
      return '锡伯族';
    }else if (value === 39){
      return '阿昌族';
    }else if (value === 40){
      return '普米族';
    }else if (value === 41){
      return '塔吉克族';
    }else if (value === 42){
      return '怒族';
    }else if (value === 43){
      return '乌孜别克族';
    }else if (value === 44){
      return '俄罗斯族';
    }else if (value === 45){
      return '鄂温克族';
    }else if (value === 46){
      return '德昂族';
    }else if (value === 47){
      return '保安族';
    }else if (value === 48){
      return '裕固族';
    }else if (value === 49){
      return '京族';
    }else if (value === 50){
      return '塔塔尔族';
    }else if (value === 51){
      return '独龙族';
    }else if (value === 52){
      return '鄂伦春族';
    }else if (value === 53){
      return '赫哲族';
    }else if (value === 54){
      return '门巴族';
    }else if (value === 55){
      return '珞巴族';
    }else if (value === 56){
      return '基诺族';
    } else {
      console.warn('请传入1-56的值')
      return '-';
    }
  }
}
