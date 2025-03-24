package club.yunzhi.smartcommunity.entity;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@SQLDelete(sql = "update `vehicle_type` set deleted = 1 where id = ?")
public class VehicleType extends SoftDeleteEntity {
  @ApiModelProperty("车辆类型名称")
  @Column(nullable = false, unique = true)
  private String name = "";

  /**
   * 用于排序的权重
   * 权重越小越靠前
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long weight = 0L;

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

}
