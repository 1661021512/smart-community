package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Transactional
class RelationshipRepositoryTest {
  @Autowired
  RelationshipRepository relationshipRepository;

  @Test
  public void test() {
    this.relationshipRepository.findAll();
  }
}