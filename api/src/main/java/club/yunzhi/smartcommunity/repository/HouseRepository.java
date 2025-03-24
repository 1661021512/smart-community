package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Building;
import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.House;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface HouseRepository extends PagingAndSortingRepository<House, Long>, JpaSpecificationExecutor<House> {
  Long countByBuildingAndDeletedIsFalse(Building district);
}
