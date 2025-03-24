package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class SkillRepositoryTest extends RepositoryTest {
  @Autowired
  SkillRepository skillRepository;
  @Test
  void findByNameAndDeletedIsFalse() {
    this.skillRepository.findByNameAndDeletedIsFalse("abc");
  }

  @Test
  void findTop20ByNameContainsAndDeletedIsFalse() {
    this.skillRepository.findTop20ByNameContainsAndDeletedIsFalse("abc");
  }
}