package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.County;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * 县仓库层
 */
public interface CountyRepository extends CrudRepository<County, Long> {
  Optional<County> findTopBydeletedIsFalseOrderByIdDesc();
}
