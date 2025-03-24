package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.lang.Nullable;

/**
 * 志愿者活动管理
 */
public interface VolunteerActivityRepository extends JpaSpecificationExecutor<VolunteerActivity>, PagingAndSortingRepository<VolunteerActivity, Long> {
}
