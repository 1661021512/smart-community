package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


class VehicleRepositoryTest extends RepositoryTest{
  @Autowired
  VehicleRepository vehicleRepository;

  @Test
  void count() {
    this.vehicleRepository.count();
  }
}