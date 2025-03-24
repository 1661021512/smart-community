package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.DutyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class DutySpecsTest {
    @Autowired
    DutyRepository dutyRepository;

    @Test
    void containingName() {
        this.dutyRepository.count(DutySpecs.containingName("123"));
    }
}
