package club.yunzhi.smartcommunity;

/**
 * h2数据自定义函数.
 *
 * @author panjie
 */
public class H2Functions {
  /**
   * 时间戳.
   *
   * @return 当前时间戳
   */
  public static int unixTimestamp() {
    return (int) (System.currentTimeMillis() / 1000L);
  }

}
