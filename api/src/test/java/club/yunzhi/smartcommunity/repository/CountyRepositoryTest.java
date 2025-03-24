package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class CountyRepositoryTest extends RepositoryTest {
  @Autowired
  CountyRepository countyRepository;

  @Test
  void findTopByIsDeletedIsFalseOrderByIdDesc() {
   this.countyRepository.findTopBydeletedIsFalseOrderByIdDesc();
  }
}