package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 录入居民数据统计实体
 */
@Entity
@Table(indexes = @Index(columnList = "date"))
public class Statistics {

  /**
   * id
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  /**
   * 用户信息
   */
  @ManyToOne
  @NotFound
  @JsonView(UserJsonView.class)
  @JoinColumn(nullable = false)
  private WebUser webUser;

  @ManyToOne
  @JsonView(StatisticsLogJsonView.class)
  @JoinColumn(nullable = false)
  private StatisticsLog statisticsLog;

  /**
   * 存储的日期：20210312（2021年3月12）
   */
  private Integer date;


  @CreationTimestamp
  private Timestamp createTime;

  /**
   * 录入条数
   */
  private Long totalCount;

  public WebUser getWebUser() {
    return webUser;
  }

  public void setWebUser(WebUser webUser) {
    this.webUser = webUser;
  }

  public Long getTotalCount() {
    return totalCount;
  }

  public void setTotalCount(Long totalCount) {
    this.totalCount = totalCount;
  }

  public Integer getDate() {
    return date;
  }

  public StatisticsLog getStatisticsLog() {
    return statisticsLog;
  }

  public void setStatisticsLog(StatisticsLog statisticsLog) {
    this.statisticsLog = statisticsLog;
  }

  public void setDate(Integer date) {
    this.date = date;
  }

  public Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Timestamp createTime) {
    this.createTime = createTime;
  }

  public interface UserJsonView {
  }

  public interface StatisticsLogJsonView {
  }
}
