package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * 车辆
 */
@Entity
@SQLDelete(sql = "update `vehicle` set deleted = 1 where id = ?")
public class Vehicle extends SoftDeleteEntity {
  /**
   * 停车位使用类型,true为自有，false为租赁
   */
  static public Boolean PARKING_SPACE_TYPE_OWN = true;
  static public Boolean PARKING_SPACE_TYPE_LEASE = false;
  static public Integer DEFAULT_COLOUR = 0;

  @ApiModelProperty("车主")
  @ManyToOne
  @JsonView(OwnerJsonView.class)
  private Resident owner;

  @ApiModelProperty("车牌号")
  @Column(nullable = false)
  private String plateNumber = "";

  @ApiModelProperty("车辆品牌")
  @ManyToOne
  private VehicleBrand brand;

  @ApiModelProperty("车辆类型")
  @ManyToOne
  private VehicleType type;

  @ApiModelProperty("车辆颜色")
  @Column(nullable = false)
  private Integer colour = DEFAULT_COLOUR;

  @ApiModelProperty("停车位号码")
  private String parkingSpaceNumber = "";

  @ApiModelProperty("停车位使用类型")
  private Boolean parkingSpaceType = PARKING_SPACE_TYPE_OWN;

  public Resident getOwner() {
    return owner;
  }

  public void setOwner(Resident owner) {
    this.owner = owner;
  }

  public String getPlateNumber() {
    return plateNumber;
  }

  public void setPlateNumber(String plateNumber) {
    this.plateNumber = plateNumber;
  }

  public Integer getColour() {
    return colour;
  }

  public void setColour(Integer colour) {
    this.colour = colour;
  }

  public Boolean getParkingSpaceType() {
    return parkingSpaceType;
  }

  public void setParkingSpaceType(Boolean parkingSpaceType) {
    this.parkingSpaceType = parkingSpaceType;
  }

  public String getParkingSpaceNumber() {
    return parkingSpaceNumber;
  }

  public void setParkingSpaceNumber(String parkingSpaceNumber) {
    this.parkingSpaceNumber = parkingSpaceNumber;
  }

  public VehicleBrand getBrand() {
    return brand;
  }

  public void setBrand(VehicleBrand brand) {
    this.brand = brand;
  }

  public VehicleType getType() {
    return type;
  }

  public void setType(VehicleType type) {
    this.type = type;
  }

  public interface OwnerJsonView {
  }
}
