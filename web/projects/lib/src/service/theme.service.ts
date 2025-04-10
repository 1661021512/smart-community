import {Injectable} from '@angular/core';
import {BasicService} from '@yunzhi/ng-theme';
import {Observable} from 'rxjs';
import {MenuService} from './menu.service';
import {WebUserService} from '../../../../src/service/web-user.service';
import {CommonService} from './common.service';
import {randomNumber} from '@yunzhi/utils';
import {Router} from '@angular/router';

/**
 * 主题服务, 用于重写主题的一些设置
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BasicService {
  private slogans = [
    '星星之火，可以燎原',
    '改革是动力，发展是目标，稳定是前提',
    '讲学习，讲政治，讲正气',
    '决不能走浪费资源和先污染后治理的路子',
    '创新是一个民族进步的灵魂',
    '枪杆子里面出政权',
    '万事开头难，干革命就不要怕困难',
    '星星之火，可以燎原',
    '长征是宣言书，长征是宣传队，长征是播种机',
    '我们中华民族有同自己的敌人血战到底的气概',
    '我们共产党员，是近代历史上最先进的革命者',
    '我们共产党人好比种子，人民好比土地',
    '一切反动派都是纸老虎',
    '在战略上要藐视敌人，在战术上要重视敌人',
    '夺取全国胜利，这只是万里长征走完了第一步',
    '中国人死都不怕，还怕困难吗',
    '中国人从此站立起来了',
    '道路总是曲折的，前途总是光明的',
    '不懂决不要装懂，但是必须由不懂变为懂',
    '我们的敌人最害怕我们的团结',
    '百花齐放、百家争鸣',
    '活到老，学到老，改造到老',
    '不管黑猫白猫，抓到老鼠就是好猫',
    '科学技术这一仗，一定要打，而且必须打好',
    '解放思想，实事求是，团结一致向前看',
    '走自己的道路，建设有中国特色的社会主义',
    '一个国家，两种制度',
    '和平与发展是当代世界的两大问题',
    '改革是中国的第二次革命',
    '科学技术是第一生产力',
    '基本路线要管一百年，动摇不得',
    '改革开放胆子要大一些，敢于试验',
    '走社会主义道路，就是要逐步实现共同富裕',
    '发展才是硬道理',
    '发展起来以后的问题不比不发展时少',
    '确立人才资源是第一资源的思想',
    '文艺是民族精神的火炬，是人民奋进的号角',
    '树立和落实科学发展观',
    '党的根基在人民、血脉在人民、力量在人民',
    '牢固树立社会主义法治理念，坚持执法为民',
    '在“捧杀”面前不上当，在重大利益上不让步',
    '人民对美好生活的向往，就是我们的奋斗目标',
    '理想信念就是共产党人精神上的“钙”',
    '改革开放只有进行时没有完成时',
    '一张好的蓝图一干到底',
    '鞋子合不合脚，自己穿了才知道',
    '照镜子、正衣冠、洗洗澡、治治病',
    '绿水青山就是金山银山',
    '作风建设永远在路上，永远没有休止符',
    '人民有信仰，民族有希望，国家有力量',
    '撸起袖子加油干',
    '既不走封闭僵化的老路，也不走改旗易帜的邪路',
    '中国开放的大门不会关闭，只会越开越大',
    '打铁必须自身硬',
    '把权力关进制度的笼子',
    '幸福都是奋斗出来的',
    '社会主义并没有定于一尊、一成不变的套路',
    '中国经济是一片大海，而不是一个小池塘',
    '世上没有从天而降的英雄，只有挺身而出的凡人',
    '我国脱贫攻坚战取得了全面胜利',
    '江山就是人民，人民就是江山',
    '中国共产党万岁',
    '没有调查，没有发言权',
    '自己动手，丰衣足食',
    '撸起袖子加油干，咬定目标使劲干！',
    '幸福都是奋斗出来的！',
    '不忘初心，牢记使命，永远奋斗！',
    '强信心、聚民心、暖人心、筑同心！',
    '千家万户都好，国家才能好，民族才能好！',
    '人民是共和国的坚实根基！',
    '人民有信仰，国家有力量，民族有希望！',
    '中国的今天，是中国人民干出来的！',
    '始终把人民放在心中最高的位置！',
    '治国必先治党、治党务必从严！',
    '全面深化改革，全面扩大开放！',
    '世界好，中国才能好。中国好，世界才更好！',
    '坚持“一国两制”，推进祖国统一！',
    '良好生态环境是最普惠的民生福祉！',
    '绿水青山就是金山银山！',
    '让人民群众真正感受到公平正义就在身边！',
    '人民对美好生活的向往就是我们的奋斗目标！',
    '小康不小康，关键看老乡！',
    '走中国特色社会主义乡村振兴道路！',
    '中国要强，农业必须强！',
    '中国要美，农村必须美！',
    '中国要富，农民必须富！',
    '努力创造属于新时代的光辉业绩！',
    '每一个人都是新时代的见证者、开创者、建设者！',
    '让爱国主义成为每一个中国人的坚定信念和精神依靠！',
    '我们都在努力奔跑，我们都是追梦人！',
    '为中国人民谋幸福，为中华民族谋复兴！',
    '中华民族一家亲，同心共筑中国梦！',
    '中国共产党的领导是中国特色社会主义最本质的特征！',
    '增强“四个意识”，坚定“四个自信”，做到“两个维护”！',
    '全面建成小康社会，全面深化改革，全面依法治国，全面从严治党！',
    '知识分子必须与工农群众相结合',
    '毫不利己，专门利人',
    '为人民服务',
    '愚公移山',
    '下定决心，不怕牺牲，排除万难，去争取胜利',
    '谦虚、谨慎、戒骄、戒躁',
    '自力更生',
    '和平、民主、团结',
    '中华人民共和国万岁',
    '中国人民站起来了',
    '大兴调查研究之风',
    '尊重知识、尊重人才',
    '科学技术是第一生产力',
    '解放思想，实事求是，团结一致向前看',
    '坚持四项基本原则',
    '改革开放',
    '有理想、有道德、有文化、有纪律',
    '一国两制',
    '建设有中国特色社会主义',
    '面向现代化，面向世界，面向未来',
    '贫穷不是社会主义',
    '三个有利于',
    '社会主义市场经济',
    '武装人、引导人、塑造人、鼓舞人',
    '讲学习，讲政治，讲正气',
    '三个代表',
    '依法治国、以德治国',
    '与时俱进',
    '人才强国',
    '全面建设小康社会',
    '统筹兼顾',
    '和平发展',
    '可持续发展',
    '建设社会主义新农村',
    '服务型政府',
    '科学执政、民主执政、依法执政',
    '八荣八耻',
    '以人为本',
    '构建社会主义和谐社会',
    '科学发展观',
    '学习型政党',
  ] as string[];


  constructor(private menuService: MenuService,
              private router: Router,
              private commonService: CommonService,
              private userService: WebUserService) {
    super();
  }

  back() {
    this.commonService.back();
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser$(): Observable<{
    name: string;
  }> {
    return this.userService.currentLoginUser$;
  }

  getMenus(): Observable<{
    name: string;
    url: string;
    icon: string;
    roles: string[]
  }[]> {
    return this.menuService.getMenus();
  }

  getTitle(): Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next(this.slogans[randomNumber(this.slogans.length)]);
      setInterval(() =>
          subscriber.next(this.slogans[randomNumber(this.slogans.length)]),
        10 * 1000);
    });
  }

  isShowBack$() {
    return this.commonService.canBack();
  }

  logout() {
    this.userService.logout().subscribe({
      error:() => this.router.navigateByUrl('/login').then(),
      complete: () => this.router.navigateByUrl('/login').then()
    });
  }
}
