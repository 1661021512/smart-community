package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.repository.WebUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.domain.Specification;

@DataJpaTest
public class WebUserSpecsTest {
    @Autowired
    WebUserRepository webUserRepository;

    @Test
    void districtNameContains() {
        Specification<WebUser> specification = WebUserSpecs.districtNameContains("123123");
        this.webUserRepository.findAll(specification);
    }

}
