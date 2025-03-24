package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@DataJpaTest
class SoftDeleteRepositoryImplTest {
  @Autowired
  UnitRepository unitRepository;

  @Test
  void findAll() {
    this.unitRepository.findAll(PageRequest.of(0, 10));
  }

  @Test
  void count() {
    this.unitRepository.findAll();
  }
}