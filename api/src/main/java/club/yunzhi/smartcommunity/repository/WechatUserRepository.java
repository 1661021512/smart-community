package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.WechatUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * 微信用户
 */
public interface WechatUserRepository extends CrudRepository<WechatUser, String> {
}
