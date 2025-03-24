package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.VolunteerActivityRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class VolunteerActivitySpecsTest {
    @Autowired
    VolunteerActivityRepository volunteerActivityRepository;

    @Test
    void containingName() {
        this.volunteerActivityRepository.count(VolunteerActivitySpecs.containingName("123"));
    }

    @Test
    void equalEndDate() {
        this.volunteerActivityRepository.count(VolunteerActivitySpecs.equalEndDate(12345678));
    }

    @Test
    void isActive() {
        this.volunteerActivityRepository.count(VolunteerActivitySpecs.isActive((short) 1, 12345678));
    }

    @Test
    void containContact() {
        this.volunteerActivityRepository.count(VolunteerActivitySpecs.containingContact("contact"));
    }

    @Test
    void containingPlace() {
        this.volunteerActivityRepository.count(VolunteerActivitySpecs.containingPlace("place"));
    }
}
