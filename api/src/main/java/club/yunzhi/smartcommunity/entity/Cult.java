package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.sql.Timestamp;

/**
 * 邪教
 */
@Entity
@SQLDelete(sql = "update `cult` set deleted = 1 where id = ?")
public class Cult extends SoftDeleteEntity {
  public static final String TABLE_NAME = "cult";
  @Column(nullable = false)
  private String name = "";

  /**最后一次的使用时间*/
  private Timestamp lastUsedTime;

  public Timestamp getLastUsedTime() {
    return lastUsedTime;
  }

  public void setLastUsedTime(Timestamp lastUsedTime) {
    this.lastUsedTime = lastUsedTime;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
