package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Role;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.repository.specs.RoleSpecs;
import club.yunzhi.smartcommunity.repository.specs.TownSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import java.util.Optional;

/**
 * 角色.
 */
public interface RoleRepository extends PagingAndSortingRepository<Role, Long>, JpaSpecificationExecutor<Role> {
  default Page<Role> getAll(String name, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<Role> specification = RoleSpecs.containingName(name);
    return this.findAll(specification, pageable);
  }

  Optional<Role> findByValueAndDeletedIsFalse(String value);
}
