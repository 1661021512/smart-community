package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.util.Assert;

import javax.persistence.*;

/**
 * 用户数据统计
 */
@Entity
public class WebUserDataStatistics {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JsonView(UserJsonView.class)
  @JoinColumn(nullable = false)
  private WebUser webUser;

  @ManyToOne
  @JsonView(TownJsonView.class)
  private District town;

  @ManyToOne
  @JsonView(CommunityJsonView.class)
  private District community;

  @ManyToOne
  @JsonView(VillageJsonView.class)
  private District village;

  @ManyToOne
  @JsonView(BuildingJsonView.class)
  private District building;

  @ManyToOne
  @JsonView(CountyJsonView.class)
  private District county;

  @ApiModelProperty("录入总数")
  @Column(nullable = false)
  private Long enterCount = 0L;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public WebUser getWebUser() {
    return this.webUser;
  }

  public void setWebUser(WebUser user) {
    this.webUser = user;
    Assert.notNull(user.getDistrict(), "未获取到用户的区域信息");
    District district = user.getDistrict();
    switch (district.getType()) {
      case District.TYPE_BUILDING:
        this.setBuilding(district);
        break;
      case District.TYPE_VILLAGE:
        this.setVillage( district);
        break;
      case District.TYPE_COMMUNITY:
        this.setCommunity(district);
        break;
      case District.TYPE_TOWN:
        this.setTown(district);
        break;
      default:
        this.setCounty(district);
    }
  }

  public Long getEnterCount() {
    return enterCount;
  }

  public void setEnterCount(Long enterCount) {
    this.enterCount = enterCount;
  }

  public District getTown() {
    return town;
  }

  protected void setTown(District town) {
    this.town = town;
    this.setCounty(town.getParent());
  }

  public District getCommunity() {
    return community;
  }

  protected void setCommunity(District community) {
    this.community = community;
    this.setTown(community.getParent());
  }

  public District getVillage() {
    return village;
  }

  protected void setVillage(District village) {
    this.village = village;
    this.setCommunity(village.getParent());
  }

  public District getBuilding() {
    return building;
  }

  protected void setBuilding(District building) {
    this.building = building;
    this.setVillage(building.getParent());
  }

  public District getCounty() {
    return county;
  }

  protected void setCounty(District county) {
    this.county = county;
  }

  public interface UserJsonView {
  }


  private class TownJsonView {
  }

  private class CommunityJsonView {
  }

  private class VillageJsonView {
  }

  private class BuildingJsonView {
  }

  private class CountyJsonView {
  }
}
