package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Entity;

@SQLDelete(sql = "update `community3d` set deleted = 1 where id = ?")
@Entity
public class Community3d extends SoftDeleteEntity {
  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
