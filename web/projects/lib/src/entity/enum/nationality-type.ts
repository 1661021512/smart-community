import {StatusEnum} from './statusEnum';

/**
 * 民族
 */
export type NationalityType = 0 | 1 | 2 | 3 |4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27
  |28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56 ;
export const Nationality_TYPE = {
  han :{
    value: 1 as NationalityType,
    description: '汉族',
  } as StatusEnum<NationalityType>,
  mongol :{
    value: 2 as NationalityType,
    description: '蒙古族',
  } as StatusEnum<NationalityType>,
  hui :{
    value: 3 as NationalityType,
    description: '回族',
  } as StatusEnum<NationalityType>,
  zang:{
    value: 4 as NationalityType,
    description: '藏族',
  } as StatusEnum<NationalityType>,
  uyghur :{
    value: 5 as NationalityType,
    description: '维吾尔族',
  } as StatusEnum<NationalityType>,
  miao :{
    value: 6 as NationalityType,
    description: '苗族',
  } as StatusEnum<NationalityType>,
  yi :{
    value: 7 as NationalityType,
    description: '彝族',
  } as StatusEnum<NationalityType>,
  zhuang :{
    value: 8 as NationalityType,
    description: '壮族',
  } as StatusEnum<NationalityType>,
  buyi :{
    value: 9 as NationalityType,
    description: '布依族',
  } as StatusEnum<NationalityType>,
  chosen :{
    value: 10 as NationalityType,
    description: '朝鲜族',
  } as StatusEnum<NationalityType>,
  man :{
    value: 11 as NationalityType,
    description: '满族',
  } as StatusEnum<NationalityType>,
  dong :{
    value: 12 as NationalityType,
    description: '侗族',
  } as StatusEnum<NationalityType>,
  yao :{
    value: 13 as NationalityType,
    description: '瑶族',
  } as StatusEnum<NationalityType>,
  bai :{
    value: 14 as NationalityType,
    description: '白族',
  } as StatusEnum<NationalityType>,
  tujia :{
    value: 15 as NationalityType,
    description: '土家族',
  } as StatusEnum<NationalityType>,
  hani :{
    value: 16 as NationalityType,
    description: '哈尼族',
  } as StatusEnum<NationalityType>,
  kazak :{
    value: 17 as NationalityType,
    description: '哈萨克族',
  } as StatusEnum<NationalityType>,
  dai :{
    value: 18 as NationalityType,
    description: '傣族',
  } as StatusEnum<NationalityType>,
  li :{
    value: 19 as NationalityType,
    description: '黎族',
  } as StatusEnum<NationalityType>,
  lisu :{
    value: 20 as NationalityType,
    description: '傈僳族',
  } as StatusEnum<NationalityType>,
  va :{
    value: 21 as NationalityType,
    description: '佤族',
  } as StatusEnum<NationalityType>,
  she :{
    value: 22 as NationalityType,
    description: '畲族',
  } as StatusEnum<NationalityType>,
  gaoshan :{
    value: 23 as NationalityType,
    description: '高山族',
  } as StatusEnum<NationalityType>,
  lahu :{
    value: 24 as NationalityType,
    description: '拉祜族',
  } as StatusEnum<NationalityType>,
  sui :{
    value: 25 as NationalityType,
    description: '水族',
  } as StatusEnum<NationalityType>,
  dongxing :{
    value: 26 as NationalityType,
    description: '东乡族',
  } as StatusEnum<NationalityType>,
  naxi :{
    value: 27 as NationalityType,
    description: '纳西族',
  } as StatusEnum<NationalityType>,
  jingpo :{
    value: 28 as NationalityType,
    description: '景颇族',
  } as StatusEnum<NationalityType>,
  kirgiz :{
    value: 29 as NationalityType,
    description: '柯尔克孜族',
  } as StatusEnum<NationalityType>,
  tu :{
    value: 30 as NationalityType,
    description: '土族',
  } as StatusEnum<NationalityType>,
  daur :{
    value: 31 as NationalityType,
    description: '达斡尔族',
  } as StatusEnum<NationalityType>,
  mulao :{
    value: 32 as NationalityType,
    description: '仫佬族',
  } as StatusEnum<NationalityType>,
  qiang :{
    value: 33 as NationalityType,
    description: '羌族',
  } as StatusEnum<NationalityType>,
  blang :{
    value: 34 as NationalityType,
    description: '布朗族',
  } as StatusEnum<NationalityType>,
  salar :{
    value: 35 as NationalityType,
    description: '撒拉族',
  } as StatusEnum<NationalityType>,
  maonan :{
    value: 36 as NationalityType,
    description: '毛南族',
  } as StatusEnum<NationalityType>,
  gelao :{
    value: 37 as NationalityType,
    description: '仡佬族 ',
  } as StatusEnum<NationalityType>,
  xibe :{
    value: 38 as NationalityType,
    description: '锡伯族',
  } as StatusEnum<NationalityType>,
  achang :{
    value: 39 as NationalityType,
    description: '阿昌族',
  } as StatusEnum<NationalityType>,
  pumi :{
    value: 40 as NationalityType,
    description: '普米族',
  } as StatusEnum<NationalityType>,
  tajik :{
    value: 41 as NationalityType,
    description: '塔吉克族',
  } as StatusEnum<NationalityType>,
  nu :{
    value: 42 as NationalityType,
    description: '怒族',
  } as StatusEnum<NationalityType>,
  uzbek :{
    value: 43 as NationalityType,
    description: '乌孜别克族',
  } as StatusEnum<NationalityType>,
  russ :{
    value: 44 as NationalityType,
    description: '俄罗斯族',
  } as StatusEnum<NationalityType>,
  ewenki :{
    value: 45 as NationalityType,
    description: '鄂温克族',
  } as StatusEnum<NationalityType>,
  deang :{
    value: 46 as NationalityType,
    description: '德昂族',
  } as StatusEnum<NationalityType>,
  bonan :{
    value: 47 as NationalityType,
    description: '保安族',
  } as StatusEnum<NationalityType>,
  yugur :{
    value: 48 as NationalityType,
    description: '裕固族',
  } as StatusEnum<NationalityType>,
  gin :{
    value: 49 as NationalityType,
    description: '京族',
  } as StatusEnum<NationalityType>,
  tatar :{
    value: 50 as NationalityType,
    description: '塔塔尔族',
  } as StatusEnum<NationalityType>,
  derung :{
    value: 51 as NationalityType,
    description: '独龙族',
  } as StatusEnum<NationalityType>,
  oroqen :{
    value: 52 as NationalityType,
    description: '鄂伦春族',
  } as StatusEnum<NationalityType>,
  hezhen :{
    value: 53 as NationalityType,
    description: '赫哲族',
  } as StatusEnum<NationalityType>,
  monba :{
    value: 54 as NationalityType,
    description: '门巴族',
  } as StatusEnum<NationalityType>,
  lhoba :{
    value: 55 as NationalityType,
    description: '珞巴族',
  } as StatusEnum<NationalityType>,
  jion :{
    value: 56 as NationalityType,
    description: '基诺族',
  } as StatusEnum<NationalityType>,
};
