package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.repository.specs.WebUserSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

/**
 * 用户仓库
 */
public interface WebUserRepository extends CrudRepository<WebUser, Long>, JpaSpecificationExecutor<WebUser> {

  Optional<WebUser> findByUsernameAndDeletedIsFalse(String username);

  default Page<WebUser> getAll(String name, String username, List districtsId, String districtName, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<WebUser> specification =
            WebUserSpecs.containingName(name)
                    .and(WebUserSpecs.equalUsername(username))
                    .and(WebUserSpecs.inDistrictIds(districtsId))
                    .and(WebUserSpecs.districtNameContains(districtName));
    return this.findAll(specification, pageable);
  }

  Optional<WebUser> findByUser(User user);
}
