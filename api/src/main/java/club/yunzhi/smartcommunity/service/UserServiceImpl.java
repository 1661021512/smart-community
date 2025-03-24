package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.model.AuthUserDetails;
import club.yunzhi.smartcommunity.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/1/10
 * @blog https://segmentfault.com/u/myskies
 * @description 用户认证服务
 */
@Service
public class UserServiceImpl implements UserService, AuditorAware<User> {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Optional<AuthUserDetails> getAuthUserDetailWithoutTransaction() {
    logger.debug("根据认证获取当前登录用户名，并获取该用户");
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null) {
      AuthUserDetails userDetail;
      if (authentication instanceof UsernamePasswordAuthenticationToken) {
        userDetail = (AuthUserDetails) authentication.getPrincipal();
      } else if (authentication instanceof AuthUserDetails) {
        userDetail = (AuthUserDetails) authentication;
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

  /**
   * 自动添加创建用户，创建时间，更新用户，更新时间
   * panjie
   * 官方手册地址： https://docs.spring.io/spring-data/jpa/docs/2.0.8.RELEASE/reference/html/#auditing
   */
  @Override
  public Optional<User> getCurrentAuditor() {
    Optional<AuthUserDetails> authUserDetailsOptional = this.getAuthUserDetailWithoutTransaction();
    return authUserDetailsOptional.map(AuthUserDetails::getUser);
  }
}
