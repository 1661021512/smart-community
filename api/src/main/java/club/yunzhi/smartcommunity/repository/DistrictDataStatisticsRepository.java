package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.DistrictDataStatistics;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface DistrictDataStatisticsRepository extends CrudRepository<DistrictDataStatistics, Long> {

  @Modifying
  @Transactional
  void deleteAllByDistrictId(Long districtId);

  List<DistrictDataStatistics> findAllByDistrictParent(District district);

  Optional<DistrictDataStatistics> findByDistrictId(Long districtId);
}
