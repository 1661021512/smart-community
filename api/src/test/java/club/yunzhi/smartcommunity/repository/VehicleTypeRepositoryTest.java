package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class VehicleTypeRepositoryTest extends RepositoryTest{
  @Autowired
  VehicleTypeRepository vehicleTypeRepository;


  @Test
  void existsByNameAndDeletedIsFalse() {
    this.vehicleTypeRepository.existsByNameAndDeletedIsFalse("abc");
  }
}
