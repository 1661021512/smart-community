package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Job;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 工作
 */
public interface JobRepository extends PagingAndSortingRepository<Job, Long> {
}
