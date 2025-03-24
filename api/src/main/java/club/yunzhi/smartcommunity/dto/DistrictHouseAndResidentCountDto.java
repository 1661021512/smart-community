package club.yunzhi.smartcommunity.dto;

import club.yunzhi.smartcommunity.entity.District;

public class DistrictHouseAndResidentCountDto {
  private District district;
  private Long houseCount;
  /**
   * 居民总数
   */
  private long residentCount;

  public District getDistrict() {
    return district;
  }

  public void setDistrict(District district) {
    this.district = district;
  }

  public Long getHouseCount() {
    return houseCount;
  }

  public void setHouseCount(Long houseCount) {
    this.houseCount = houseCount;
  }

  public long getResidentCount() {
    return residentCount;
  }

  public void setResidentCount(long residentCount) {
    this.residentCount = residentCount;
  }
}
