package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 职务实体
 */
@Entity
@SQLDelete(sql = "update `duty` set deleted = 1 where id = ?")
public class Duty extends SoftDeleteEntity {

  public static String POST_TOWN = "town";
  public static String POST_COMMUNITY = "community";

  /**
   * 名称
   */
  @Column(nullable = false)
  private String name;

  /**
   * 权重
   */
  @Column(nullable = false)
  private Long weight;

  /**
   * 区域类型
   */
  @Column(nullable = false)
  private String typeOfDistrict;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getWeight() {
    return weight;
  }

  public void setWeight(Long weight) {
    this.weight = weight;
  }

  public String getTypeOfDistrict() {
    return typeOfDistrict;
  }

  public void setTypeOfDistrict(String typeOfDistrict) {
    this.typeOfDistrict = typeOfDistrict;
  }
}
