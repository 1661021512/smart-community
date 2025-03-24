package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 宗教信仰.
 */
@Entity
@SQLDelete(sql = "update `religious_belief` set deleted = 1 where id = ?")
public class ReligiousBelief extends SoftDeleteEntity {

  @Column(nullable = false, unique = true)
  @ColumnDefault("''")
  private String name = "";

  public ReligiousBelief() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
