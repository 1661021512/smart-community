package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Relationship;
import club.yunzhi.smartcommunity.repository.specs.RelationshipSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

public interface RelationshipRepository extends PagingAndSortingRepository<Relationship, Long>, JpaSpecificationExecutor<Relationship> {
  default Page<Relationship> getAll(String name, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<Relationship> specification = RelationshipSpecs.containingName(name);
    return this.findAll(specification, pageable);
  }
}
