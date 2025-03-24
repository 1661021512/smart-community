package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class RoleRepositoryTest extends RepositoryTest {
  @Autowired
  RoleRepository roleRepository;
  @Test
  void findByValueAndDeletedIsFalse() {
    this.roleRepository.findByValueAndDeletedIsFalse("abc");
  }
}