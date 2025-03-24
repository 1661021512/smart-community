package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@SQLDelete(sql = "update `district` set deleted = 1 where id = ?")
@DiscriminatorValue(District.TYPE_BUILDING)
public class Building extends District {
  /**
   * 每层户数
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long housesLengthOfFloor;

  /**
   * 水平偏移
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long horizontalOffset;

  /**
   * 最大层高
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long maxFloor;


  /**
   * 类型
   */

  @Column(nullable = false)
  @ColumnDefault("0")
  private Short houseType;

  /**
   * 单元数
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long unitCount;

  /**
   * 包含的单元(楼房）或是排（平房）
   */
  @OneToMany(mappedBy = "building")
  @Where(clause = "deleted = false")
  @JsonView(UnitJsonView.class)
  private List<Unit> units = new ArrayList<>();

  /**
   * 垂直偏移
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long verticalOffset;

  public Building() {
    this.setType(District.TYPE_BUILDING);
  }

  @JsonView(VillageJsonView.class)
  public Village getVillage() {
    return (Village) this.getParent();
  }

  public Long getHorizontalOffset() {
    return horizontalOffset;
  }

  public void setHorizontalOffset(Long horizontalOffset) {
    this.horizontalOffset = horizontalOffset;
  }

  public Short getHouseType() {
    return houseType;
  }

  public void setHouseType(Short houseType) {
    this.houseType = houseType;
  }

  public Long getMaxFloor() {
    return maxFloor;
  }

  public void setMaxFloor(Long maxFloor) {
    this.maxFloor = maxFloor;
  }

  public Long getUnitCount() {
    return unitCount;
  }

  public void setUnitCount(Long unitCount) {
    this.unitCount = unitCount;
  }

  public List<Unit> getUnits() {
    return units;
  }

  public void setUnits(List<Unit> units) {
    this.units = units;
  }

  public Long getHousesLengthOfFloor() {
    return housesLengthOfFloor;
  }

  public void setHousesLengthOfFloor(Long housesLengthOfFloor) {
    this.housesLengthOfFloor = housesLengthOfFloor;
  }

  public Long getVerticalOffset() {
    return verticalOffset;
  }

  public void setVerticalOffset(Long verticalOffset) {
    this.verticalOffset = verticalOffset;
  }

  public void setVillage(Village village) {
    this.setParent(village);
  }

  public interface VillageJsonView {
  }

  public interface UnitJsonView {
  }
}
