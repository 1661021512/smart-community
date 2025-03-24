import {Root} from '../../app';
import {config} from '../../config';

const root = getApp<Root>();
const userService = root.service.userService;

Page({
  data: {
    url: ''
  },
  onLoad() {
    const url = config.webViewUrl + '?x-auth-token=' + userService.xAuthToken;
    console.log('跳转的url为', url);
    this.setData({url});
  }
})
