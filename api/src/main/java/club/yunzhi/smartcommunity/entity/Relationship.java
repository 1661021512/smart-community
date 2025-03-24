package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Entity;

/**
 * 居民关系
 */
@Entity
@SQLDelete(sql = "update `relationship` set deleted = 1 where id = ?")
public class Relationship extends SoftDeleteEntity {
  /**
   * 名称
   */
  private String name;

  /**
   * 权重
   */
  private Integer weight;

  public Relationship() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getWeight() {
    return weight;
  }

  public void setWeight(Integer weight) {
    this.weight = weight;
  }
}
