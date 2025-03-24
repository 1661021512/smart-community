package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.input.VUser;
import club.yunzhi.smartcommunity.input.ValidateMessage;
import club.yunzhi.smartcommunity.repository.WebUserRepository;
import club.yunzhi.smartcommunity.service.WebUserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

/**
 * 用户c层
 */
@RestController
@RequestMapping("webUser")
public class WebUserController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final WebUserService webUserService;
  private final WebUserRepository webUserRepository;

  public WebUserController(WebUserService webUserService, WebUserRepository webUserRepository) {
    this.webUserService = webUserService;
    this.webUserRepository = webUserRepository;
  }

  /**
   * 校验密码是否正确
   *
   * @param vUser 带有密码的VUser
   * @return true 正确 false 不正确
   */
  @PostMapping("checkPasswordIsRight")
  public boolean checkPasswordIsRight(@RequestBody VUser vUser) {
    return this.webUserService.checkPasswordIsRight(vUser);
  }

  @GetMapping("currentLoginUser")
  @JsonView(CurrentLoginUserJsonView.class)
  public WebUser currentLoginUser() {
    return this.webUserService.getCurrentLoginWebUser().get();
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.webUserService.delete(id);
  }

  @PutMapping("{id}")
  @JsonView(EditJsonView.class)
  public WebUser edit(@PathVariable Long id, @RequestBody WebUser user) {
    return this.webUserService.update(id, user);
  }

  @GetMapping("existByUsername")
  public boolean existByUsername(@RequestParam String username) {
    return this.webUserService.existByUsername(username);
  }

  @RequestMapping("login")
  @JsonView(LoginJsonView.class)
  public WebUser login(Principal user) {
    return this.webUserRepository.findByUsernameAndDeletedIsFalse(user.getName()).orElseThrow(() -> new EntityNotFoundException("未在数据库中找到用户，这可能是当前用户被删除导致的"));
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

  /**
   * 获取所有用户
   *
   * @param pageable 分页信息
   * @return 所有用户
   */
  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<WebUser> findAll(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String username,
      @RequestParam(required = false) String districtName,
      @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
          Pageable pageable) {
    return this.webUserService.getAll(
        name,
        username,
        districtName,
        pageable);
  }

  /**
   * 通过id获取用户
   *
   * @param id
   * @return
   */
  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public WebUser getById(@PathVariable Long id) {
    return this.webUserService.findById(id);
  }

  @GetMapping("getByUsername/{username}")
  @JsonView(GetByUsername.class)
  public WebUser getByUsername(@PathVariable String username) {
    return this.webUserService.findByUsername(username);
  }


  /**
   * 重置密码接口.
   *
   * @param id id
   */
  @PatchMapping("resetPassword/{id}")
  @JsonView(ResetPasswordJsonView.class)
  public String resetPassword(@PathVariable Long id) {
    return this.webUserService.resetPassword(id);
  }

  /**
   * 根据验证码进行密码重置
   *
   * @param validateMessage
   * @return
   */
  @PatchMapping("resetPasswordByUsernameAndCode")
  @JsonView(resetPasswordByUsernameAndCode.class)
  public String resetPasswordByUsernameAndCode(@RequestBody ValidateMessage validateMessage) {
    logger.debug("密码重置");
    return webUserService.resetPasswordByValidateMessage(validateMessage);
  }

  /**
   * 发送验证码
   *
   * @param username
   */
  @GetMapping("sendVerificationCode")
  public void sendVerificationCode(@RequestParam String username) {
    this.webUserService.sendVerificationCode(username);
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public WebUser save(@RequestBody WebUser user) {
    return this.webUserService.save(user);
  }

  /**
   * 修改密码
   *
   * @param vUser 带有新密码和旧密码VUser
   */
  @PutMapping("updatePassword")
  public void updatePassword(@RequestBody VUser vUser) {
    this.webUserService.updatePassword(vUser);
  }

  private class LoginJsonView implements User.RolesJsonView, User.DistrictJsonView {
  }

  private class CurrentLoginUserJsonView implements User.RolesJsonView, User.DistrictJsonView, District.ParentJsonView {
  }

  private class AddJsonView implements User.RolesJsonView, User.DistrictJsonView {
  }

  private class EditJsonView implements User.RolesJsonView, User.DistrictJsonView {
  }

  private class PageJsonView implements User.RolesJsonView, User.DistrictJsonView {
  }

  private class GetByIdJsonView implements User.DistrictJsonView, User.RolesJsonView {
  }

  private class resetPasswordByUsernameAndCode {
  }

  private class ResetPasswordJsonView {
  }

  private class GetByUsername {
  }
}
