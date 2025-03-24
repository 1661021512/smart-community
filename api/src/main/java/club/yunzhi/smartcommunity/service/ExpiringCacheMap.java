package club.yunzhi.smartcommunity.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 带有过期属性的缓存Map
 *
 * @param <T> key
 * @param <U> value
 */
public class ExpiringCacheMap<T, U> {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  /**
   * 查询次数
   */
  private static int queryCount = 0;
  /**
   * 最大查询次数（超出后清空过期缓存）
   */
  private static int maxCount = 10000;

  /**
   * 数据有效的秒数
   */
  private final int secondsUntilExpiration;

  public ExpiringCacheMap() {
    this(60 * 60);
  }

  public ExpiringCacheMap(int secondsUntilExpiration) {
    this.secondsUntilExpiration = secondsUntilExpiration;
  }

  /**
   * 用户管理的区域
   */
  private final Map<T, ExpiringCache<U>> map = new ConcurrentHashMap<>();

  public boolean containsKey(T user) {
    return this.map.containsKey(user);
  }

  public U get(T key) {
    return this.map.get(key).getValue();
  }

  public synchronized void putOrReplace(T key, U value) {
    this.clearExpired();
    if (this.map.containsKey(key)) {
      this.map.replace(key, new ExpiringCache<>(value));
    } else {
      this.put(key, value);
    }
  }

  public synchronized void put(T key, U value) {
    this.clearExpired();
    this.map.put(key, new ExpiringCache<>(value, this.secondsUntilExpiration));
  }

  public void clear(T key) {
    this.map.remove(key);
  }

  public void clear() {
    this.map.clear();
  }

  /**
   * 清除过期数据
   */
  private void clearExpired() {
    queryCount++;
    if (queryCount > maxCount) {
      queryCount = 0;
      this.logger.info("清空过期数据");
      List<T> expiredValues = new ArrayList<>();
      this.map.forEach((key, listExpiringCache) -> {
        if (listExpiringCache.isExpired()) {
          expiredValues.add(key);
        }
      });

      expiredValues.forEach(this.map::remove);
    }
  }
}
