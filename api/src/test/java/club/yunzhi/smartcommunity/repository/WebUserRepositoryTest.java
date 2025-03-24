package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

class WebUserRepositoryTest extends RepositoryTest {
  @Autowired
  WebUserRepository webUserRepository;
  @Test
  void findByUsernameAndDeletedIsFalse() {
    this.webUserRepository.findByUsernameAndDeletedIsFalse("abc");
  }

  @Test
  void findByUser() {
    User user = new User();
    user.setId(new Random().nextLong());
    this.webUserRepository.findByUser(user);
  }
}