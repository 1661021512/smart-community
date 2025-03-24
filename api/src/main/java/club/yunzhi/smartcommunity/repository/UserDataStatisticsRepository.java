package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.WebUserDataStatistics;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface UserDataStatisticsRepository extends CrudRepository<WebUserDataStatistics, Long>, JpaSpecificationExecutor {
}
