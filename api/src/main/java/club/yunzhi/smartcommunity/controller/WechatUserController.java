package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.WechatUser;
import club.yunzhi.smartcommunity.service.WechatUserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;


/**
 * 微信小程序后台服务
 * https://github.com/Wechat-Group/WxJava/tree/develop/spring-boot-starters/wx-java-miniapp-spring-boot-starter
 */
@RequestMapping("wechatUser")
@RestController
public class WechatUserController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  private final WechatUserService wechatUserService;

  public WechatUserController(WechatUserService wechatUserService) {
    this.wechatUserService = wechatUserService;
  }

  /**
   * 使用code完成登录
   */
  @GetMapping("login")
  @JsonView(LoginJsonView.class)
  public WechatUser login() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (WechatUser) principal;
  }

  /**
   * 注册
   *
   * @param getUserInfoInput 用户加密后的手机号信息
   * @return 手机号存在, true;不存在,false. sessionKey无效等抛出异常
   */
  @PostMapping("register")
  public Boolean register(@RequestBody GetUserInfoInput getUserInfoInput) {
    Assert.notNull(getUserInfoInput, "输入不能为空");
    Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    if (!(user instanceof WechatUser)) {
      throw new AccessDeniedException("未获取到登录的微信用户");
    }
    WechatUser wechatUser = (WechatUser) user;
    return this.wechatUserService.register(wechatUser, getUserInfoInput.getEncryptedData(), getUserInfoInput.getIv());
  }

  @PutMapping("updateCurrentWechatUser")
  @JsonView(UpdateCurrentWechatUserJsonView.class)
  public WechatUser updateCurrentWechatUser(@RequestBody WechatUser wechatUser) {
    return this.wechatUserService.updateCurrentWechatUser(wechatUser);
  }

  public static class GetUserInfoInput {
    private String encryptedData;
    private String iv;

    public GetUserInfoInput() {
    }

    public String getEncryptedData() {
      return encryptedData;
    }

    public void setEncryptedData(String encryptedData) {
      this.encryptedData = encryptedData;
    }

    public String getIv() {
      return iv;
    }

    public void setIv(String iv) {
      this.iv = iv;
    }
  }

  private class LoginJsonView {
  }

  private class UpdateCurrentWechatUserJsonView {
  }
}


