package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.StatisticsLog;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface StatisticsLogRepository extends PagingAndSortingRepository<StatisticsLog, Long>, JpaSpecificationExecutor {
  Optional<StatisticsLog> findTopOneByOrderByCreateTimeDesc();
}
