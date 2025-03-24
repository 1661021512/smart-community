package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.repository.specs.TownSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;
import org.springframework.data.domain.Pageable;

public interface TownRepository extends PagingAndSortingRepository<Town, Long>, JpaSpecificationExecutor<Town> {

  default Page<Town> getAll(String name, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<Town> specification = TownSpecs.containingName(name);
    return this.findAll(specification, pageable);
  }
}
