package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@Transactional
class JobTypeRepositoryTest {
  @Autowired
  JobTypeRepository jobTypeRepository;
  @Test
  void findTop20ByNameContainsAndDeletedIsFalse() {
    this.jobTypeRepository.findTop20ByNameContainsAndDeletedIsFalse("123");
  }

  @Test
  void findByNameAndDeletedIsFalse() {
    this.jobTypeRepository.findByNameAndDeletedIsFalse("123");
  }
}