package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Entity;

/**
 * 3d实体
 */
@Entity
@SQLDelete(sql = "update `village3d_model` set deleted = 1 where id = ?")
public class Village3dModel extends SoftDeleteEntity {
  /**
   * 实体名称
   */
  String name;

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }
}
