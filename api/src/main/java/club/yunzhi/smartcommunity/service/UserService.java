package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.model.AuthUserDetails;

import java.util.Optional;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/1/10
 * @blog https://segmentfault.com/u/myskies
 * @description 认证用户服务
 */
public interface UserService {
  /**
   * 获取认证用户
   * <p>
   *   当前认证用户已经没有了事务的支持，所以不能直接在上面调用Lasy的属性
   * </p>
   */
  Optional<AuthUserDetails> getAuthUserDetailWithoutTransaction();
}
