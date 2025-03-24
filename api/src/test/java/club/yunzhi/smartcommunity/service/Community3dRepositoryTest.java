package club.yunzhi.smartcommunity.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@Transactional
class Community3dRepositoryTest {
  @Autowired
  Community3dRepository community3dRepository;

  @Test
  void findAll() {
    this.community3dRepository.findAll();
  }
}