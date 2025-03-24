package club.yunzhi.smartcommunity.service;

import java.util.Calendar;
/**
 * 会过期的缓存数据
 * 数据过期后也不主动销毁，对过期只是提供方法支撑
 *
 * @param <T> 数据
 */
public class ExpiringCache<T> {
  private final T value;
  /**
   * 最近一次的使用时间
   */
  private final Calendar lastUseTime;
  /**
   * 过期的秒数
   */
  private final int secondsUntilExpiration;

  public ExpiringCache(T value) {
    this(value, 60 * 60);
  }

  public ExpiringCache(T value, int secondsUntilExpiration) {
    this.value = value;
    this.lastUseTime = Calendar.getInstance();
    this.secondsUntilExpiration = secondsUntilExpiration;
  }

  T getValue() {
    this.lastUseTime.setTimeInMillis(System.currentTimeMillis());
    return this.value;
  }

  boolean isExpired() {
    Calendar now = Calendar.getInstance();
    return now.compareTo(this.lastUseTime) > this.secondsUntilExpiration * 1000;
  }
}
