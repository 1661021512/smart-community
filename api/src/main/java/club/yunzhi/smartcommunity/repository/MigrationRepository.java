package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Migration;
import org.springframework.data.repository.CrudRepository;


/**
 * 数据迁移，用于防止相同的数据被多次初始化
 */
public interface MigrationRepository extends CrudRepository<Migration, Long> {
  /**
   * 查看某个批次是否存在
   *
   * @param batch 批次
   */
  boolean existsByBatch(String batch);
}
