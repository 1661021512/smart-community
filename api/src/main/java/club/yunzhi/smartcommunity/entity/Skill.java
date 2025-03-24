package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.sql.Timestamp;

/**
 * 技能、特长
 */
@Entity
@SQLDelete(sql = "update `skill` set deleted = 1 where id = ?")
public class Skill extends SoftDeleteEntity {
  public static final String TABLE_NAME = "skill";
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
