package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Grider;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * 网格员Dao层
 */
public interface GriderRepository extends PagingAndSortingRepository<Grider, Long>, JpaSpecificationExecutor<Grider> {

  /**
   * 判断对应webUser的网格员是否存在
   */
  boolean existsByWebUserIdAndDeletedIsFalse(Long webUserId);

  /**
   * 根据用户id获取对应的网格员
   *
   * @param userId 用户ID
   * @return
   */
  Optional<Grider> findByWebUserUserIdAndDeletedIsFalse(Long userId);

  /**
   * 根据Web用户id获取对应的网格员
   *
   * @param webUserId 用户ID
   * @return
   */
  Optional<Grider> findByWebUserIdAndDeletedIsFalse(Long webUserId);

  /**
   * 查找某个
   * @param houseId
   * @return
   */
  Grider findByHousesIdAndDeletedIsFalse(Long houseId);
}
