package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 企事业单位
 */
@Entity
@SQLDelete(sql = "update `enterprise` set deleted = 1 where id = ?")
public class Enterprise extends SoftDeleteEntity {
  @Column(nullable = false)
  private String name = "";

  public Enterprise() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
