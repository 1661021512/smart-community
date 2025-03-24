package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.GriderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@Transactional
class GriderSpecsTest {
  @Autowired
  GriderRepository griderRepository;

  @Test
  void equalUsername() {
    this.griderRepository.findAll(GriderSpecs.equalUsername("13131"));
  }

  @Test
  void containingName() {
    this.griderRepository.findAll(GriderSpecs.equalUsername("zhangsan"));
  }
}
