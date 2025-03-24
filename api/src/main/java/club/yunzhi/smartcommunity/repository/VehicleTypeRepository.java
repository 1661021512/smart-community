package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.VehicleType;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface VehicleTypeRepository extends PagingAndSortingRepository<VehicleType, Long>, JpaSpecificationExecutor<VehicleType> {
  Boolean existsByNameAndDeletedIsFalse(String name);
}
