package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.entity.listener.HouseListener;
import club.yunzhi.smartcommunity.enums.HouseOwnType;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * 房屋实体类
 */
@Entity
@SQLDelete(sql = "update `house` set deleted = 1 where id = ?")
@EntityListeners(HouseListener.class)
public class House extends SoftDeleteEntity {
  public static final String TABLE_NAME = "house";
  private static final Logger logger = LoggerFactory.getLogger(House.class);

  /**
   * 入住时间
   */
  private Timestamp checkInTime;

  @ManyToOne
  @JsonView(GriderJsonView.class)
  private Grider grider;

  /**
   * 第几层（层数）
   */
  @Column(nullable = false)
  private Long floor;

  /**
   * 名称
   */
  @Column(nullable = false)
  @ColumnDefault("''")
  private String name = "";

  /**
   * 偏移量
   * 距离上一住宅的距离
   * offset是SQL的一个关键字
   * 使用name来定义为the_offset必须查询时的SQL错误
   */
  @Column(nullable = false, name = "the_offset")
  @ColumnDefault("0")
  private Long offset = 0L;

  /**
   * 户主
   */
  @JsonView(OwnerJsonView.class)
  @ManyToOne
  private Resident owner;

  /**
   * 房屋面积
   */
  @Column(nullable = false)
  private Long area = 0L;

  /**
   * 是否保障性住房
   */
  @Column(nullable = false)
  private Boolean lowIncoming = false;

  /**
   * 是否减免房屋补贴住房
   */
  @Column(nullable = false)
  private Boolean relief = false;

  /**
   * 备注
   */
  @Column(nullable = false)
  private String remarks = "";

  /**
   * 使用性质
   * 自用owner和租借
   */
  @Column(nullable = false)
  private Short type = HouseOwnType.OWNER.getValue();

  /**
   * 所处的单元（楼房）或是排（平房）
   */
  @ManyToOne
  @NotFound
  @JoinColumn(nullable = false)
  @JsonView(UnitJsonView.class)
  private Unit unit;

  /**
   * 小区
   */
  @ManyToOne
  @NotFound
  @JoinColumn(nullable = false)
  @JsonView(BuildingJsonView.class)
  private Building building;

  @ManyToMany
  @Where(clause = "deleted = false")
  @JoinTable(name = House.TABLE_NAME + "_" + Resident.TABLE_NAME,
      joinColumns = @JoinColumn(name = House.TABLE_NAME + "_id"),
      inverseJoinColumns = @JoinColumn(name = Resident.TABLE_NAME + "_id"))
  @JsonView(ResidentsJsonView.class)
  private List<Resident> residents = new ArrayList<>();

  /**
   * 用于排序的权重
   * 越小越靠前
   */
  @JoinColumn(nullable = false)
  private Long weight = 0L;

  /**
   * 宽度
   * 用于平房宽度不同时对齐、控制生成模型的宽度
   * 用于生成楼房模型时，不同的住房占据不同的宽度
   */
  @JoinColumn(nullable = false)
  private Long width = 0L;

  public Timestamp getCheckInTime() {
    return checkInTime;
  }

  public void setCheckInTime(Timestamp checkInTime) {
    this.checkInTime = checkInTime;
  }

  public Long getFloor() {
    return floor;
  }

  public void setFloor(Long floor) {
    this.floor = floor;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getOffset() {
    return offset;
  }

  public void setOffset(Long offset) {
    this.offset = offset;
  }

  public Resident getOwner() {
    return owner;
  }

  public void setOwner(Resident owner) {
    this.owner = owner;
  }

  public Short getType() {
    return type;
  }

  public void setType(Short type) {
    if (HouseOwnType.validate(type)) {
      this.type = type;
    } else {
      logger.warn("接收到了不可识别的type:" + type);
    }
  }

  public Unit getUnit() {
    return unit;
  }

  public void setUnit(Unit unit) {
    this.unit = unit;
  }

  public Building getBuilding() {
    return building;
  }

  public void setBuilding(Building building) {
    this.building = building;
  }

  public Long getWeight() {
    return weight;
  }

  public void setWeight(Long weight) {
    this.weight = weight;
  }

  public Grider getGrider() {
    return grider;
  }

  public void setGrider(Grider grider) {
    this.grider = grider;
  }

  public Long getWidth() {
    return width;
  }

  public void setWidth(Long width) {
    this.width = width;
  }

  public Long getArea() {
    return area;
  }

  public void setArea(Long area) {
    this.area = area;
  }

  public Boolean getRelief() {
    return relief;
  }

  public void setRelief(Boolean relief) {
    this.relief = relief;
  }

  public Boolean getLowIncoming() {
    return lowIncoming;
  }

  public void setLowIncoming(Boolean lowIncoming) {
    this.lowIncoming = lowIncoming;
  }

  public String getRemarks() {
    return remarks;
  }

  public List<Resident> getResidents() {
    return residents;
  }

  public void setResidents(List<Resident> residents) {
    this.residents = residents;
  }

  public void setRemarks(String remarks) {
    this.remarks = remarks;
  }

  public interface UnitJsonView {
  }

  public interface BuildingJsonView {
  }

  public interface OwnerJsonView {
  }

  public interface ResidentsJsonView {
  }

  public interface GriderJsonView {
  }
}
