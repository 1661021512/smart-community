package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 网格员
 */
@Entity
@SQLDelete(sql = "update `grider` set deleted = 1 where id = ?")
public class Grider extends SoftDeleteEntity {
  /**
   * 所属社区
   */
  @ManyToOne
  @JsonView(CommunityJsonView.class)
  @JoinColumn(nullable = false)
  private Community community;

  /**
   * 管理户数
   */
  @Column(nullable = false)
  private Long houseCount = 0L;

  /**
   * 管理居民数
   */
  @Column(nullable = false)
  private Long residentCount = 0L;

  @OneToMany(mappedBy = "grider")
  @Where(clause = "deleted = false")
  @JsonView(HousesJsonView.class)
  private List<House> houses = new ArrayList<>();

  /**
   * 用户信息
   */
  @OneToOne
  @NotFound
  @JsonView(WebUserJsonView.class)
  @JoinColumn(nullable = false)
  private WebUser webUser;

  public Community getCommunity() {
    return community;
  }

  public void setCommunity(Community community) {
    this.community = community;
  }

  public Long getHouseCount() {
    return houseCount;
  }

  public void setHouseCount(Long houseCount) {
    this.houseCount = houseCount;
  }

  public Long getResidentCount() {
    return residentCount;
  }

  public void setResidentCount(Long residentCount) {
    this.residentCount = residentCount;
  }

  public WebUser getWebUser() {
    return webUser;
  }

  public void setWebUser(WebUser webUser) {
    this.webUser = webUser;
  }

  public List<House> getHouses() {
    return houses;
  }

  public void setHouses(List<House> houses) {
    this.houses = houses;
  }

  public interface CommunityJsonView {}
  public interface WebUserJsonView {}

  public interface HousesJsonView {
  }
}
