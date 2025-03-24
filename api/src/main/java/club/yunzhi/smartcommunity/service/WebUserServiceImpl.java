package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Role;
import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.input.VUser;
import club.yunzhi.smartcommunity.input.ValidateMessage;
import club.yunzhi.smartcommunity.model.AuthUserDetails;
import club.yunzhi.smartcommunity.repository.UserRepository;
import club.yunzhi.smartcommunity.repository.WebUserRepository;
import club.yunzhi.smartcommunity.service.shortmessage.ValidationCodeService;
import com.mengyunzhi.core.exception.AccessDeniedException;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.mengyunzhi.core.exception.ValidationException;
import com.thoughtworks.xstream.mapper.Mapper;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * 用户m层实现类
 */
@Service
public class WebUserServiceImpl implements WebUserService, UserDetailsService {
  private final static Logger logger = LoggerFactory.getLogger(WebUserServiceImpl.class);
  private final WebUserRepository webUserRepository;

  private final UserRepository userRepository;
  private final UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  private final ValidationCodeService validationCodeService;

  /**
   * UserService与DistrictService互相依赖
   * 在此使用@Autowired注入
   */
  @Autowired
  private DistrictService districtService;

  /**
   * 重置和初始化后的密码
   */
  private String initialPassword = "yunzhi";

  public WebUserServiceImpl(WebUserRepository webUserRepository,
                            UserRepository userRepository, UserService userService, ValidationCodeService validationCodeService) {
    this.webUserRepository = webUserRepository;
    this.userRepository = userRepository;
    this.userService = userService;
    this.validationCodeService = validationCodeService;
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED)
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    WebUser user = this.webUserRepository.findByUsernameAndDeletedIsFalse(username).orElseThrow(() -> new UsernameNotFoundException("用户不存在"));
    // 主动获取角色（权限）防止Spring Security获取Roles报lazy错误
    Collection<Role> roles = user.getAuthorities();
    roles.forEach(role -> {
    });
    this.districtService.clearCache(user);
    return user;
  }

  @Override
  public WebUser findByUsername(String username) {
    return this.webUserRepository.findByUsernameAndDeletedIsFalse(username).orElse(null);
  }

  @Override
  public Optional<WebUser> getCurrentLoginWebUser() {
    return this.webUserRepository.findById(this.getCurrentLoginWebUserId()
        .orElseThrow(() -> new AccessDeniedException("当前登录类型不正确或未登录")));
  }

  @Override
  public Optional<Long> getCurrentLoginWebUserId() {
    AuthUserDetails authUserDetails = this.userService.getAuthUserDetailWithoutTransaction()
        .orElseThrow(() -> new AccessDeniedException("当前登录类型不正确或未登录"));
    if (authUserDetails instanceof WebUser) {
      return Optional.of(((WebUser) authUserDetails).getId());
    } else {
      return Optional.empty();
    }
  }

  @Override
  public WebUser save(WebUser webUser) {
    Assert.notNull(webUser.getUsername(), "用户手机号不能为空");
    Assert.notNull(webUser.getName(), "用户姓名不能为空");
    Assert.notNull(webUser.getRoles(), "传入的角色数组不能为空");
    Assert.notNull(webUser.getDistrict().getId(), "用户区域不能为空");
    webUser.getRoles().forEach(role -> Assert.notNull(role.getId(), "未传入角色ID"));

    WebUser newUser = new WebUser();
    newUser.setName(webUser.getName());
    newUser.setUsername(webUser.getUsername());
    newUser.setRoles(webUser.getRoles());
    newUser.setDistrict(webUser.getDistrict());

    logger.debug("将新增用户的密码设置为默认密码");
    newUser.setPassword(initialPassword);
    logger.debug("新用户状态设置为正常");
    newUser.setStatus(User.STATUS_NORMAL);

    this.userRepository.save(newUser.getUser());
    return this.webUserRepository.save(newUser);
  }

  @Override
  public WebUser update(long id, WebUser user) {
    Assert.notNull(user.getRoles(), "编辑后的用户角色不能为空");
    Assert.notNull(user.getName(), "编辑后的用户名称不能为空");
    Assert.notNull(user.getUsername(), "编辑后的用户用户名不能为空");
    Assert.notNull(user.getDistrict(), "编辑后的区域不能为空");

    WebUser newUser = this.webUserRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("用户未找到"));
    newUser.setUsername(user.getUsername());

    logger.debug("首先将该用户的角色清空,然后再进行修改");
    newUser.setRoles(user.getRoles());
    newUser.setName(user.getName());
    newUser.setDistrict(user.getDistrict());

    return this.webUserRepository.save(newUser);
  }

  @Override
  public WebUser findById(Long id) {
    return this.webUserRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("根据id获取uesr失败"));
  }

  @Override
  public void delete(Long id) {
    WebUser user = this.webUserRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("删除实体未找到"));

    logger.debug("实体存在的情况下，将该实体进行删除");
    this.webUserRepository.deleteById(user.getId());
  }

  @Override
  public boolean existByUsername(String username) {
    return this.webUserRepository.findByUsernameAndDeletedIsFalse(username).isPresent();
  }

  @Override
  public String resetPassword(Long id) {
    WebUser user = this.findById(id);
    String newPassword = new RandomString(6).nextString();
    user.setPassword(newPassword);
    this.webUserRepository.save(user);

    return newPassword;
  }

  @Override
  public Page<WebUser> getAll(String name, String username, String districtName, Pageable pageable) {
    List<Long> districtsId = new ArrayList<>();
    logger.debug("创建根据名称查询的数组，null表示没有输入查询参数，不为null但数组为空表示没有查询到数据，不为null且不为空表示有效查询");

    logger.debug("根据username获取当前登录用户");
    Optional<WebUser> user = this.getCurrentLoginWebUser();
    if (user.isPresent()) {
      districtsId = this.districtService.getChildrenIdsWithItself(user.get().getDistrict());
    }

    return this.webUserRepository.getAll(name, username, districtsId, districtName, pageable);
  }

  @Override
  public void updatePassword(VUser vUser) {
    logger.debug("获取当前用户");
    Optional<WebUser> currentUser = this.getCurrentLoginWebUser();

    logger.debug("校验原密码是否正确");
    if (!this.checkPasswordIsRight(vUser)) {
      throw new ValidationException("原密码不正确");
    }

    logger.debug("更新密码");
    currentUser.get().setPassword(vUser.getNewPassword());
    this.webUserRepository.save(currentUser.get());
  }

  @Override
  public void sendVerificationCode(String phoneNumber) {
    Assert.notNull(phoneNumber, "手机号不能为空");

    logger.debug("验证手机号");
    if (!this.existByUsername(phoneNumber)) {
      throw new IllegalArgumentException("该用户未注册");
    }

    logger.debug("发送验证码");
    this.validationCodeService.sendCode(phoneNumber);
  }

  @Override
  public boolean checkPasswordIsRight(VUser vUser) {
    logger.debug("获取当前用户");
    Optional<WebUser> user = this.getCurrentLoginWebUser();
    if (!user.isPresent()) {
      throw new RuntimeException("未找到当前登录用户");
    }

    logger.debug("比较密码是否正确");
    return this.passwordEncoder.matches(vUser.getPassword(), user.get().getPassword());
  }

  @Override
  public String resetPasswordByValidateMessage(ValidateMessage validateMessage) {
    logger.debug("调用validateService的验证方法");
    String username = validateMessage.getUsername();
    String validateCode = validateMessage.getVerificationCode();
    if (this.validationCodeService.validateCode(username, validateCode)) {
      WebUser user = webUserRepository.findByUsernameAndDeletedIsFalse(username).orElseThrow(() -> new EntityNotFoundException("实体不存在"));

      logger.debug("返回设置的新密码");
      String newPassword = new RandomString(6).nextString();

      logger.debug("设置新密码并保存");
      user.setPassword(newPassword);
      webUserRepository.save(user);

      return newPassword;
    } else {
      throw new ValidationException("输入信息错误，请重新输入");
    }
  }

  @Override
  public WebUser getById(Long id) {
    return this.webUserRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(""));
  }
}


