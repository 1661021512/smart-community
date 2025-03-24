package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.PropertyCompany;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

/**
 * 物业公司
 */
public interface PropertyCompanyRepository extends PagingAndSortingRepository<PropertyCompany, Long>, JpaSpecificationExecutor<PropertyCompany> {
    Page<PropertyCompany> findAllByNameContainingAndDeletedIsFalse(String name, Pageable pageable);
}
