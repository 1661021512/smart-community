package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.WechatUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 志愿者
 */
class VolunteerRepositoryTest extends RepositoryTest {
  @Autowired
  VolunteerRepository volunteerRepository;
  @Test
  void existsByWechatUserAndDeletedIsFalse() {
    WechatUser wechatUser = new WechatUser();
    wechatUser.setId("abc");
    this.volunteerRepository.existsByWechatUserAndDeletedIsFalse(wechatUser);
  }

  @Test
  void findAllByBeStarIsTrueAndDeletedIsFalse() {
    this.volunteerRepository.findAllByBeStarIsTrueAndDeletedIsFalse();
  }

  @Test
  void findByWechatUserAndDeletedIsFalse() {
    WechatUser wechatUser = new WechatUser();
    wechatUser.setId("abc");
    this.volunteerRepository.findByWechatUserAndDeletedIsFalse(wechatUser);
  }
}