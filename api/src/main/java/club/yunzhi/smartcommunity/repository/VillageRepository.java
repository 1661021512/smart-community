package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.PropertyCompany;
import club.yunzhi.smartcommunity.entity.Village;
import club.yunzhi.smartcommunity.repository.specs.TownSpecs;
import club.yunzhi.smartcommunity.repository.specs.VillageSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import java.util.List;

public interface VillageRepository extends PagingAndSortingRepository<Village, Long>, JpaSpecificationExecutor<Village> {
  Boolean existsByNameAndDeletedIsFalse(String name);

  List<Village> findAllByPropertyCompany(PropertyCompany propertyCompany);

  default Page<Village> getAll(String name, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<Village> specification = VillageSpecs.containingName(name);
    return this.findAll(specification, pageable);
  }
}
