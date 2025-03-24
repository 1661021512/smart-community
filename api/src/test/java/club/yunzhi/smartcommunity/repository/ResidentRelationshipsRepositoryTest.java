package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@DataJpaTest
@Transactional
class ResidentRelationshipsRepositoryTest {
  @Autowired
  ResidentRelationshipsRepository residentRelationshipsRepository;

  @Test
  public void findAll() {
    this.residentRelationshipsRepository.findAll();
  }

  @Test
  public void findAllByOneResidentIdAndDeletedIsFalse() {
    this.residentRelationshipsRepository.findAllByOneResidentId(new Random().nextLong());
  }

  @Test
  public void findByOneResidentIdAndAnotherResidentIdAndDeletedIsFalse() {
    this.residentRelationshipsRepository.findByOneResidentIdAndAnotherResidentId(new Random().nextLong(), new Random().nextLong());
  }
}