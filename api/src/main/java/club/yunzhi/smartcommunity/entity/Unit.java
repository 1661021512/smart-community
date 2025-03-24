package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

@Entity
@SQLDelete(sql = "update `unit` set deleted = 1 where id = ?")

public class Unit extends SoftDeleteEntity {

  /**
   * 住宅楼
   */
  @ManyToOne
  @NotFound
  @JsonView(BuildingJsonView.class)
  @JoinColumn(nullable = false)
  private Building building;

  /**
   * 住户
   */
  @OneToMany(mappedBy = "unit")
  @Where(clause = "deleted = false")
  @JsonView(HouseJsonView.class)
  private List<House> houses = new ArrayList<>();

  /**
   * 名称
   */
  @Column(nullable = false)
  @ColumnDefault("''")
  private String name;

  /**
   * 用于排序的权重
   * 权重越小越靠前
   */
  @Column(nullable = false)
  @ColumnDefault("0")
  private Long weight;

  public Building getBuilding() {
    return building;
  }

  public void setBuilding(Building building) {
    this.building = building;
  }

  public List<House> getHouses() {
    return houses;
  }

  public void setHouses(List<House> houses) {
    this.houses = houses;
  }

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

  public interface BuildingJsonView {}
  public interface HouseJsonView {}
}
