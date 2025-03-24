package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.sql.Timestamp;

/**
 * 工作、工种、求职意向
 */
@Entity
@SQLDelete(sql = "update `job_type` set deleted = 1 where id = ?")
public class JobType extends SoftDeleteEntity {
  public static final String TABLE_NAME = "job_type";
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
