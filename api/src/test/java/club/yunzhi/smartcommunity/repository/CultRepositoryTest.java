package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class CultRepositoryTest extends RepositoryTest {
  @Autowired
  CultRepository cultRepository;

  @Test
  void findTop20ByNameContainsAndDeletedIsFalse() {
    this.cultRepository.findTop20ByNameContainsAndDeletedIsFalse("abc");
  }

  @Test
  void findByNameAndDeletedIsFalse() {
    this.cultRepository.findByNameAndDeletedIsFalse("abc");
  }
}