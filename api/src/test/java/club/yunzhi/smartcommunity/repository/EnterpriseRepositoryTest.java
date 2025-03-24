package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class EnterpriseRepositoryTest extends RepositoryTest {
  @Autowired
  EnterpriseRepository enterpriseRepository;

  @Test
  void findTop20ByNameContainsAndDeletedIsFalse() {
    this.enterpriseRepository.findTop20ByNameContainsAndDeletedIsFalse("abc");
  }

  @Test
  void findByNameAndDeletedIsFalse() {
    this.enterpriseRepository.findByNameAndDeletedIsFalse("abc");
  }
}