package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class VehicleSpecsTest extends SpecsTest{

  @Autowired
  VehicleRepository vehicleRepository;
  @Test
  void belongToVillage() {
    this.vehicleRepository.count(VehicleSpecs.belongToVillage(123L));
  }

  @Test
  void belongToType() {
    this.vehicleRepository.count(VehicleSpecs.belongToType(123L));
  }

  @Test
  void containingName() {
    this.vehicleRepository.count(VehicleSpecs.containingName("zhangsan"));
  }

  @Test
  void containingPlateNumber() {
    this.vehicleRepository.count(VehicleSpecs.containingPlateNumber("zhangsan"));
  }
}