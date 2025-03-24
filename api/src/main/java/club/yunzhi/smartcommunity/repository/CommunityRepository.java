package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.repository.specs.CommunitySpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import java.util.List;

/**
 * 社区仓库层
 */
public interface CommunityRepository extends PagingAndSortingRepository<Community, Long>, JpaSpecificationExecutor<Community> {
  default Page<Community> getAll(String name, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<Community> specification = CommunitySpecs.containingName(name);
    return this.findAll(specification, pageable);
  }

  List<Community> findAllByParentId(Long townId);
}
