package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Statistics;
import club.yunzhi.smartcommunity.entity.StatisticsLog;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

/**
 * 统计查询规范
 */
public class StatisticsSpec {
  /**
   * 用户姓名模糊查询
   *
   * @param userName 用户姓名
   */
  public static Specification<Statistics> containingUserName(String userName) {
    if (userName == null || userName.trim().isEmpty()) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(root
                .join("webUser", JoinType.LEFT)
                .join("user").get("name").as(String.class),
            String.format("%%%s%%", userName.trim()));
  }

  public static Specification<Statistics> equalsStatisticsLog(StatisticsLog statisticsLog) {
    if (statisticsLog == null || statisticsLog.getId() == null) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("statisticsLog").as(StatisticsLog.class), statisticsLog);
  }
}
