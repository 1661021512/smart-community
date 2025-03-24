package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


class ContentRepositoryTest extends RepositoryTest {
  @Autowired
  ContentRepository contentRepository;
  @Test
  void existsByKeyword() {
    this.contentRepository.existsByKeywordAndDeletedIsFalse("abc");
  }

  @Test
  void findByKeyword() {
    this.contentRepository.findByKeywordAndDeletedIsFalse("abc");
  }
}