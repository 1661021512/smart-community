package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.WechatUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class VolunteerActivitySignUpRepositoryTest extends RepositoryTest {
  @Autowired
  VolunteerActivitySignUpRepository signUpRepository;

  @Test
  void existsByVolunteerActivityIdAndVolunteerWechatUserAndDeletedIsFalse() {
    WechatUser wechatUser = new WechatUser();
    wechatUser.setId("abc");
    this.signUpRepository.existsByVolunteerActivityIdAndVolunteerWechatUserAndDeletedIsFalse(123L, wechatUser);
  }

  @Test
  void findByVolunteerAndVolunteerActivityIdAndDeletedIsFalse() {
    Volunteer volunteer = new Volunteer();
    volunteer.setId(123L);
    this.signUpRepository.findByVolunteerAndVolunteerActivityIdAndDeletedIsFalse(volunteer, 123L);
  }

  @Test
  void findAllByVolunteerActivityIdAndDeletedIsFalse() {
    this.signUpRepository.findAllByVolunteerActivityIdAndDeletedIsFalse(123L);
  }
}