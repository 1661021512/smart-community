package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Unit;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UnitRepository extends PagingAndSortingRepository<Unit, Long>, JpaSpecificationExecutor<Unit> {
}
