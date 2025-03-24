package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class VehicleBrandRepositoryTest extends RepositoryTest{
    @Autowired
    VehicleBrandRepository vehicleBrandRepository;

    @Test
    void existsByNameAndDeletedIsFalse() {
        this.vehicleBrandRepository.existsByNameAndDeletedIsFalse("abc");
    }
}