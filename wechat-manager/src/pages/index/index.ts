// 获取应用实例，该实例被规定在app.ts中
import {Root} from '../../app';
const root = getApp<Root>();
const userService = root.service.userService;

Page({
  // 声明当前页面的数据
  data: {
    motto: 'Hello World',
    userInfo: {},
    init: false,
    registered: false,
    showHelp: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // canIUseOpenData: false
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
  },
  // 应用启动时加载
  onLoad() {
    userService.registered$.subscribe({
      next: (data: boolean) => {
        if (data) {
          wx.navigateTo({
            url: './../web-view/web-view'
          });
        } else {
          this.setData({init: true});
        }
      }
    })
  },
  // 定义方法
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用户认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  onGetPhoneNumber(e: { detail: { errMsg: string, iv: string, encryptedData: string } }) {
    this.setData({showHelp: false});
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      userService.register(e.detail.encryptedData, e.detail.iv)
        .subscribe({
          next: data => {
            if (data) {
              wx.navigateTo({
                url: './../web-view/web-view'
              });
            } else {
              wx.navigateTo({
                url: './../login/login'
              })
            }
          }
        });
    } else {
      console.log('未获取到用户手机号码', e);
      this.data.showHelp = true;
      this.setData(this.data);
    }
  }
})
