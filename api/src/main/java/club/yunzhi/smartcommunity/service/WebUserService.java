package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.input.VUser;
import club.yunzhi.smartcommunity.input.ValidateMessage;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * 用户m层接口
 */
public interface WebUserService {

  /**
   * 校验密码是否正确
   *
   * @param vUser 带有密码的VUser
   * @return true 正确 false 不正确
   */
  boolean checkPasswordIsRight(VUser vUser);

  /**
   * 删除
   * @param id
   */
  void delete(Long id);

  boolean existByUsername(String username);

  WebUser findById(Long id);



  WebUser findByUsername(String username);

  /**
   * 综合查询
   * @param name 用户姓名
   * @param username 用户手机号
   * @param district 所属区域
   * @param pageable
   * @return
   */
  Page<WebUser> getAll(String name, String username, String district, @NotNull Pageable pageable);

  WebUser getById(Long id);

  Optional<WebUser> getCurrentLoginWebUser();

  /**
   * 获取当前登录用户的 ID
   * @return ID
   */
  Optional<Long> getCurrentLoginWebUserId();

  /**
   * 重置密码
   * @param validateMessage
   */
  String resetPasswordByValidateMessage(ValidateMessage validateMessage);

  /**
   * 重置密码.
   *
   * @param id id
   */
  String resetPassword(Long id);

  /**
   * 用户新增
   * @param user
   * @return
   */
  WebUser save(WebUser user);

  /**
   * 发送验证码.
   *
   * @param phoneNumber 手机号码
   */
  void sendVerificationCode(String phoneNumber);

  /**
   * 用户更新
   * @param id
   * @param user
   * @return
   */
  WebUser update(long id, WebUser user);

  /**
   * 修改密码
   *
   * @param vUser 带有新密码和旧密码VUser
   */
  void updatePassword(VUser vUser);
}
