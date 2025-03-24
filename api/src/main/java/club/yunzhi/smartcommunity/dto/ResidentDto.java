package club.yunzhi.smartcommunity.dto;

import club.yunzhi.smartcommunity.entity.Resident;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/9/26
 * @blog https://segmentfault.com/u/myskies
 * @description 居民
 */
public class ResidentDto extends Resident {
  private String idNumber;
  private String phone;

  public String getIdNumber() {
    return idNumber;
  }

  public void setIdNumber(String idNumber) {
    this.idNumber = idNumber;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }
}
