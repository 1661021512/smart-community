package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/1/10
 * @blog https://segmentfault.com/u/myskies
 * @description 基础用户
 */
public interface UserRepository extends CrudRepository<User, Long> {
}
