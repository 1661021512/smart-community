package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Statistics;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 统计模块
 */
public interface StatisticsRepository extends PagingAndSortingRepository<Statistics, Long>, JpaSpecificationExecutor<Statistics> {
}
