package club.yunzhi.smartcommunity.exception;

/**
 * 服务没有被注册
 */
public class ServiceNotRegisteredException extends RuntimeException {
  public ServiceNotRegisteredException(String message) {
    super(message);
  }
}
