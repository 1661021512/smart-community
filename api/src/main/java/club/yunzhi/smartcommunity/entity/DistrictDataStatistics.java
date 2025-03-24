package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

/**
 * 区域数据统计
 */
@Entity
public class DistrictDataStatistics {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ApiModelProperty("区域")
  @OneToOne
  @JoinColumn(nullable = false)
  @JsonView(DistrictJsonView.class)
  @NotFound
  private District district;

  @ApiModelProperty("居民总数")
  @Column(nullable = false)
  private Long residentCount = 0L;

  @ApiModelProperty("住房总数")
  @Column(nullable = false)
  private Long houseCount = 0L;

  @ApiModelProperty("党员总数")
  @Column(nullable = false)
  private Long partyMemberCount = 0L;

  @ApiModelProperty("接种疫苗总数")
  @Column(nullable = false)
  private Long covid19DefensedCount = 0L;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public District getDistrict() {
    return district;
  }

  public void setDistrict(District district) {
    this.district = district;
  }

  public Long getResidentCount() {
    return residentCount;
  }

  public void setResidentCount(Long residentCount) {
    this.residentCount = residentCount;
  }

  public Long getHouseCount() {
    return houseCount;
  }

  public void setHouseCount(Long houseCount) {
    this.houseCount = houseCount;
  }

  public Long getPartyMemberCount() {
    return partyMemberCount;
  }

  public void setPartyMemberCount(Long partyMemberCount) {
    this.partyMemberCount = partyMemberCount;
  }

  public Long getCovid19DefensedCount() {
    return covid19DefensedCount;
  }

  public void setCovid19DefensedCount(Long covid19DefensedCount) {
    this.covid19DefensedCount = covid19DefensedCount;
  }

  public interface DistrictJsonView {
  }
}
