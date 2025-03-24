package club.yunzhi.smartcommunity.service;


import club.yunzhi.smartcommunity.entity.WechatUser;

import java.util.Optional;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/8/20
 * @blog https://segmentfault.com/u/myskies
 * @description 微信
 */
public interface WechatUserService {
  /**
   * 获取当前登录的微信用户(不携带事务)
   */
  Optional<WechatUser> getCurrentLoginWechatUserWithoutTransaction();

  /**
   * 注册
   *
   * @param wechatUser    微信用户
   * @param encryptedData 加密数据
   * @param iv            加密令牌
   * @return 注册成功true, 失败false; sessionKey过期
   * @throws club.yunzhi.smartcommunity.exception.TimelinessException sessionKey过期异常
   */
  boolean register(WechatUser wechatUser, String encryptedData, String iv);

  /**
   * 更新当前登录微信用户的基础信息
   * @param wechatUser 微信用户
   */
  WechatUser updateCurrentWechatUser(WechatUser wechatUser);
}
