package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.District;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DistrictRepository extends CrudRepository<District, Long> {
  List<District> findAllByTypeAndDeletedIsFalse(String type);
}
