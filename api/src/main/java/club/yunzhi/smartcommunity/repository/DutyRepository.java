package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Duty;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 职务管理
 */
public interface DutyRepository extends PagingAndSortingRepository<Duty, Long>, JpaSpecificationExecutor<Duty> {
}
