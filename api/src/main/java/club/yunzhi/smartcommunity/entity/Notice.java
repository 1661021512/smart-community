package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.*;

/**
 * 通知公告
 */
@Entity
@SQLDelete(sql = "update `notice` set deleted = 1 where id = ?")
@Table(indexes = @Index(columnList = "weight"))
public class Notice extends SoftDeleteEntity {
  /**
   * 内容
   */
  @Column(columnDefinition = "TEXT", nullable = false)
  private String content = "";

  /**
   * 图片
   */
  @OneToOne
  @JsonView(ImageJsonView.class)
  private Attachment image;

  /**
   * 副标题
   */
  @Column(nullable = false)
  private String subTitle = "";

  @Column(nullable = false)
  private String title = "";

  /**
   * 摘要
   */
  @Column(nullable = false)
  private String summary = "";

  /**
   * 权重，越小越靠前
   */
  @Column(nullable = false)
  private Long weight = 0L;

  public Long getWeight() {
    return weight;
  }

  public void setWeight(Long weight) {
    this.weight = weight;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getSubTitle() {
    return subTitle;
  }

  public void setSubTitle(String subTitle) {
    this.subTitle = subTitle;
  }

  public Attachment getImage() {
    return image;
  }

  public void setImage(Attachment image) {
    this.image = image;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public interface ImageJsonView {}
}
