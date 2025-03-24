package club.yunzhi.smartcommunity.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 认证用户
 */
@RestController
@RequestMapping("authUser")
public class AuthUserController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  public AuthUserController() {
  }

  @RequestMapping("login")
  @JsonView(LoginJsonView.class)
  public Object login() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return principal;
  }

  @GetMapping("logout")
  public void logout(HttpServletRequest request, HttpServletResponse response) {
    logger.info("用户注销");
    // 获取用户认证信息
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // 存在认证信息，注销
    if (authentication != null) {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
  }

  private class LoginJsonView {
  }
}
