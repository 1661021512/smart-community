package club.yunzhi.smartcommunity.service.shortmessage;

/**
 * 手机验证码
 *
 * @author panjie
 */
public interface ValidationCodeService {
  /**
   * 发送验证码
   * 默认有效时间5分钟
   *
   * @param phoneNumber 手机号
   * @return 验证码
   */
  String sendCode(String phoneNumber);

  /**
   * 校验验证码是否有效
   * 默认最大获取次数为3次。同一手机号同一验证码获取3次以上将自动失效
   *
   * @param phoneNumber 手机号
   * @param code        验证码
   * @return 有效true 无效false
   */
  boolean validateCode(String phoneNumber, String code);
}
