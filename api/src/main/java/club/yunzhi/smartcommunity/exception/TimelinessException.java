package club.yunzhi.smartcommunity.exception;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/8/20
 * @blog https://segmentfault.com/u/myskies
 * @description 时效性异常（比如验证码过期,session过期)
 */
public class TimelinessException extends RuntimeException {
  public TimelinessException(String message) {
    super(message);
  }
}
