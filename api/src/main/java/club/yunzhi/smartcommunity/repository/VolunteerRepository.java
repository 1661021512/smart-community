package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.WechatUser;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

/**
 * 志愿者仓库层
 */
public interface VolunteerRepository extends JpaSpecificationExecutor<Volunteer>, PagingAndSortingRepository<Volunteer, Long> {

  boolean existsByWechatUserAndDeletedIsFalse(WechatUser wechatUser);

  List<Volunteer> findAllByBeStarIsTrueAndDeletedIsFalse();

  Optional<Volunteer> findByWechatUserAndDeletedIsFalse(WechatUser wechatUser);
}
