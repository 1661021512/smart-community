package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class VillageRepositoryTest extends RepositoryTest {
  @Autowired
  VillageRepository villageRepository;
  @Test
  void existsByNameAndDeletedIsFalse() {
    this.villageRepository.existsByNameAndDeletedIsFalse("abc");
  }
}