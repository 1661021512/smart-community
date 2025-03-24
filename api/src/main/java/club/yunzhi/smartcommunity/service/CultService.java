package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Cult;

import java.util.List;

/**
 * 邪教管理
 */
public interface CultService {
  List<Cult> findTop20ByNameContains(String name);

  Cult save(Cult cult);

  /**
   * 更新最后一次使用时间
   *
   * @param id
   */
  void updateLastUsedTime(Long id);
}
