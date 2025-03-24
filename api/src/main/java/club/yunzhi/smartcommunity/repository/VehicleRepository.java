package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface VehicleRepository extends PagingAndSortingRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {
}
