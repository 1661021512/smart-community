package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Content;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * 内容仓库
 */
public interface ContentRepository extends PagingAndSortingRepository<Content, Long> {

  boolean existsByKeywordAndDeletedIsFalse(String keyword);

  Optional<Content> findByKeywordAndDeletedIsFalse(String keyword);
}
