package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.VehicleTypeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class VehicleTypeSpecsTest extends SpecsTest {
  @Autowired
  VehicleTypeRepository vehicleTypeRepository;

  @Test
  void containingName() {
    this.vehicleTypeRepository.count(VehicleTypeSpecs.containingName("车辆类型"));
  }
}
