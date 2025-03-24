package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

class GriderRepositoryTest extends RepositoryTest {
  @Autowired
  GriderRepository griderRepository;

  @Test
  void existsByWebUserIdAndDeletedIsFalse() {
    this.griderRepository.existsByWebUserIdAndDeletedIsFalse(new Random().nextLong());
  }

  @Test
  void findByUserIdAndDeletedIsFalse() {
    this.griderRepository.findByWebUserUserIdAndDeletedIsFalse(new Random().nextLong());
  }

  @Test
  void findByWebUserIdAndDeletedIsFalse() {
    this.griderRepository.findByWebUserIdAndDeletedIsFalse(new Random().nextLong());
  }

  @Test
  void findByHousesIdAndDeletedIsFalse() {
    this.griderRepository.findByHousesIdAndDeletedIsFalse(new Random().nextLong());
  }
}