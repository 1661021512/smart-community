package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import static club.yunzhi.smartcommunity.entity.District.TYPE_VILLAGE;

/**
 * 小区实体类
 */
@Entity
@SQLDelete(sql = "update `district` set deleted = 1 where id = ?")
@DiscriminatorValue(TYPE_VILLAGE)
public class Village extends District {
  /**
   * 小区类型.
   * 平房为0，楼房为1
   */
  public static Short HOUSE_TYPE_BUNGALOW = 0;
  public static Short HOUSE_TYPE_BUILDING = 1;

  @JsonView(BuildingsJsonView.class)
  public List<District> getBuildings() {
    return this.getChildren();
  }

  public Village() {
    this.type = District.TYPE_VILLAGE;
  }

  public void setBuildings(List<District> buildings) {
    this.setChildren(buildings);
  }

  @JsonView(CommunityJsonView.class)
  public District getCommunity() {
    return this.getParent();
  }

  public void setCommunity(District community) {
    this.setParent(community);
  }

  /**
   * 3d模型，必须有3d模型才能新增village，当前3d模型未实现，设置为true暂时
   */
  @ManyToOne
  @JoinColumn
  @JsonView(ModelJsonView.class)
  private Village3dModel model;

  /**
   * 物业公司
   */
  @ManyToOne
  @JoinColumn
  @JsonView(PropertyCompanyJsomView.class)
  private PropertyCompany propertyCompany;

  /**
   * 经度
   */
  private BigDecimal longitude = BigDecimal.valueOf(0);

  /**
   * 维度
   */
  private BigDecimal latitude = BigDecimal.valueOf(0);

  /**
   * 建立时间
   */
  private Timestamp establishTime = new Timestamp(System.currentTimeMillis());


  /**
   * 住房类型
   */
  private Short houseType = HOUSE_TYPE_BUILDING;

  public Timestamp getEstablishTime() {
    return establishTime;
  }

  public void setEstablishTime(Timestamp establishTime) {
    this.establishTime = establishTime;
  }

  public BigDecimal getLongitude() {
    return longitude;
  }

  public void setLongitude(BigDecimal longitude) {
    this.longitude = longitude;
  }

  public BigDecimal getLatitude() {
    return latitude;
  }

  public void setLatitude(BigDecimal latitude) {
    this.latitude = latitude;
  }

  public Short getHouseType() {
    return houseType;
  }

  public void setHouseType(Short houseType) {
    this.houseType = houseType;
  }

  public Village3dModel getModel() {
    return model;
  }

  public void setModel(Village3dModel model) {
    this.model = model;
  }

  public PropertyCompany getPropertyCompany() {
    return propertyCompany;
  }

  public void setPropertyCompany(PropertyCompany propertyCompany) {
    this.propertyCompany = propertyCompany;
  }


  public interface CommunityJsonView {
  }

  public interface ModelJsonView {
  }

  public interface BuildingsJsonView {
  }

  public interface PropertyCompanyJsomView {

  }

}
