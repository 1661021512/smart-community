package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Migration;

/**
 * 用于防止数据被多次初始化的数据迁移服务
 */
public interface MigrationService {
  /**
   * 如果不存在就新建，
   *
   * @param batch 批次
   * @return 存在返回true；不存在false;
   */
  boolean existsByBatch(String batch);

  /**
   * 新建
   * @param batch 批次
   * @return
   */
  Migration save(String batch);
}
