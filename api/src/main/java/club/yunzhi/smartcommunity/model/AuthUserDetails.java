package club.yunzhi.smartcommunity.model;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.enums.UserDetailType;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 带有用户类型的登录用户详情
 */
public interface AuthUserDetails extends UserDetails {
  /**
   * 用户类型
   * <p>
   * 以区分是微信登录还是WEB登录
   * </p>
   */
  UserDetailType getType();

  User getUser();
}
