package club.yunzhi.smartcommunity.exception;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/8/20
 * @blog https://segmentfault.com/u/myskies
 * @description 当前操作不被支持
 */
public class NotSupportedException extends RuntimeException {
  public NotSupportedException(String message) {
    super(message);
  }
}
