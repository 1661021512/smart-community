package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Grider;
import com.sun.istack.NotNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.Assert;

import javax.persistence.criteria.JoinType;


/**
 * 网格员查询条件构造
 */
public class GriderSpecs {
  /**
   * 按手机号查找网格员中用户用户名
   *
   * @param username 手机号（用户名）
   * @return
   */
  public static Specification<Grider> equalUsername(@NotNull String username) {
    if (username == null || username.trim().isEmpty()) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(
            root.join("webUser", JoinType.LEFT)
                .get("username").as(String.class), username.trim());
  }

  /**
   * 根据姓名查询网格员
   *
   * @param name 用户姓名
   * @return
   */
  public static Specification<Grider> containingName(String name) {
    if (name == null || name.trim().isEmpty()) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(
            root.join("webUser", JoinType.LEFT)
                .join("user")
                .get("name").as(String.class), String.format("%%%s%%", name.trim()));
  }
}
