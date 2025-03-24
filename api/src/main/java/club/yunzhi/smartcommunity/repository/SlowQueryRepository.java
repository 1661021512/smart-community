package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.SlowQuery;
import org.springframework.data.repository.CrudRepository;

/**
 * 慢查询记录
 */
public interface SlowQueryRepository extends CrudRepository<SlowQuery, Long> {
}
