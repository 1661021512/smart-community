package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * 内容实体
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"keyword", "deleteAt"}))
@SQLDelete(sql = "update `content` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class Content extends SoftDeleteEntity {
  @Column(columnDefinition = "TEXT", nullable = false)
  private String content = "";

  @Column(nullable = false)
  private String keyword;

  @Column(nullable = false)
  private String title = "";

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
