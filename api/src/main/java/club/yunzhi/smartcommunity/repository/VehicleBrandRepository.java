package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.VehicleBrand;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface VehicleBrandRepository extends PagingAndSortingRepository<VehicleBrand, Long>, JpaSpecificationExecutor<VehicleBrand> {
   Boolean existsByNameAndDeletedIsFalse(String name);

   VehicleBrand findByNameAndDeletedIsFalse(String name);
}
