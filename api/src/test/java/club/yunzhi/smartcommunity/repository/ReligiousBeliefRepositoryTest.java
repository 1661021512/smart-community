package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class ReligiousBeliefRepositoryTest extends RepositoryTest {
  @Autowired
  ReligiousBeliefRepository religiousBeliefRepository;

  @Test
  void findTop20ByNameContainsAndDeletedIsFalse() {
    this.religiousBeliefRepository.findTop20ByNameContainsAndDeletedIsFalse("abc");
  }

  @Test
  void findByNameAndDeletedIsFalse() {
    this.religiousBeliefRepository.findByNameAndDeletedIsFalse("abc");
  }
}