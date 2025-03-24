package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MyFileRepositoryTest extends RepositoryTest {
  @Autowired
  MyFileRepository myFileRepository;
  @Test
  void findTopBySha1AndMd5AndDeletedIsFalse() {
    this.myFileRepository.findTopBySha1AndMd5("123", "123");
  }
}