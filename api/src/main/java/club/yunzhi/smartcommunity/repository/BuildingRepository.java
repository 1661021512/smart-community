package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Building;
import club.yunzhi.smartcommunity.repository.specs.BuildingSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

public interface BuildingRepository extends PagingAndSortingRepository<Building, Long>, JpaSpecificationExecutor<Building> {
  default Page<Building> getAll(String name, Long villageId, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<Building> specification = BuildingSpecs.containingName(name).and(BuildingSpecs.belongToVillage(villageId));
    return this.findAll(specification, pageable);
  }
}
