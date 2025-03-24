package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.WechatUser;
import club.yunzhi.smartcommunity.exception.NotSupportedException;
import club.yunzhi.smartcommunity.repository.WechatUserRepository;
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Optional;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/8/20
 * @blog https://segmentfault.com/u/myskies
 */
@Service
public class WechatUserServiceImpl implements WechatUserService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final WxMaService wxMaService;
  private final WechatUserRepository wechatUserRepository;

  public WechatUserServiceImpl(WxMaService wxMaService, WechatUserRepository wechatUserRepository) {
    this.wxMaService = wxMaService;
    this.wechatUserRepository = wechatUserRepository;
  }

  @Override
  public Optional<WechatUser> getCurrentLoginWechatUserWithoutTransaction() {
    logger.debug("根据认证获取当前登录用户名，并获取该用户");
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null) {
      WechatUser userDetail;
      if (authentication instanceof UsernamePasswordAuthenticationToken) {
        userDetail = (WechatUser) authentication.getPrincipal();
      } else if (authentication instanceof WechatUser) {
        userDetail = (WechatUser) authentication;
      } else if (authentication instanceof AnonymousAuthenticationToken) {
        return Optional.empty();
      } else {
        throw new RuntimeException("获取类型不正确");
      }
      return Optional.of(userDetail);
    }

    logger.debug("认证用户在数据库中不存在");
    return Optional.empty();
  }

  @Override
  public boolean register(WechatUser wechatUser, String encryptedData, String iv) {
    try {
      WxMaPhoneNumberInfo wxMaPhoneNumberInfo = this.wxMaService.getUserService().getPhoneNoInfo(
          wechatUser.getSessionKey(),
          encryptedData,
          iv);
      if (!wxMaPhoneNumberInfo.getCountryCode().equals("86")) {
        throw new NotSupportedException("当前仅支持国内手机号绑定注册");
      }
      String phoneNumber = wxMaPhoneNumberInfo.getPurePhoneNumber();
      Optional<WechatUser> optionalUser = this.wechatUserRepository.findById(wechatUser.getId());
      if (!optionalUser.isPresent()) {
        return false;
      }

      optionalUser.get().setMobile(phoneNumber);
      optionalUser.get().setRegistered(true);
      optionalUser.get().setEnabled(true);
      this.wechatUserRepository.save(optionalUser.get());
    } catch (Exception e) {
      this.logger.error("在获取用户手机号信息时发生错误", e.getMessage());
      e.printStackTrace();
      return false;
    }

    return true;
  }

  @Override
  public WechatUser updateCurrentWechatUser(WechatUser wechatUser) {
    Assert.notNull(wechatUser.getAddress(), "地址不能为空");
    Assert.notNull(wechatUser.getBirthday(), "出生日期不能为空");
    Assert.notNull(wechatUser.getIntroduction(), "个人简介不能为空");
    Assert.notNull(wechatUser.getEducation(), "教育背景不能为空");
    Assert.notNull(wechatUser.getName(), "姓名不能为空");
    Assert.notNull(wechatUser.getSex(), "性别不能为空");

    WechatUser currentWechatUser = this.getCurrentLoginWechatUserWithoutTransaction().orElseThrow(RuntimeException::new);
    WechatUser oldWechatUser = this.wechatUserRepository.findById(currentWechatUser.getId())
        .orElseThrow(() -> new RuntimeException("当前登录的用户可以被后台的管理员删除了"));
    oldWechatUser.setAddress(wechatUser.getAddress());
    oldWechatUser.setBirthday(wechatUser.getBirthday());
    oldWechatUser.setIntroduction(wechatUser.getIntroduction());
    oldWechatUser.setEducation(wechatUser.getEducation());
    oldWechatUser.setName(wechatUser.getName());
    oldWechatUser.setSex(wechatUser.getSex());
    this.wechatUserRepository.save(oldWechatUser);
    return oldWechatUser;
  }
}
