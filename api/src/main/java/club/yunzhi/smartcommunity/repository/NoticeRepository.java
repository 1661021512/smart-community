package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Notice;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 通知公告管理
 */
public interface NoticeRepository extends JpaSpecificationExecutor<Notice>, PagingAndSortingRepository<Notice, Long> {
}
