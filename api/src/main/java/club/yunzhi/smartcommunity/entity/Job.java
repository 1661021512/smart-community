package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * 工作
 */
@Entity
@SQLDelete(sql = "update `job` set deleted = 1 where id = ?")
@Table(indexes = @Index(columnList = "weight"))
public class Job extends SoftDeleteEntity {
  /**
   * 内容
   */
  @Column(columnDefinition = "TEXT", nullable = false)
  private String content = "";

  @Column(nullable = false)
  private Integer endDate;

  /**
   * 来源
   */
  @Column(nullable = false)
  private String origin = "";

  /**
   * 摘要
   */
  @Column(nullable = false)
  private String summary = "";

  /**
   * 标题
   */
  @Column(nullable = false)
  private String title = "";

  /**
   * 权重，越小越靠前
   */
  @Column(nullable = false)
  private Integer weight = 0;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Integer getEndDate() {
    return endDate;
  }

  public void setEndDate(Integer endDate) {
    this.endDate = endDate;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Integer getWeight() {
    return weight;
  }

  public void setWeight(Integer weight) {
    this.weight = weight;
  }

  public String getOrigin() {
    return origin;
  }

  public void setOrigin(String origin) {
    this.origin = origin;
  }
}
