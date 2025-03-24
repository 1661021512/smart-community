package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.VehicleBrandRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class VehicleBrandSpecsTest extends SpecsTest{
    @Autowired
    VehicleBrandRepository vehicleBrandRepository;
    @Test
    void containingName() {
        this.vehicleBrandRepository.count(VehicleBrandSpecs.containingName("车辆品牌"));
    }
}