package club.yunzhi.smartcommunity.enums;

import io.swagger.annotations.ApiModelProperty;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/1/10
 * @blog https://segmentfault.com/u/myskies
 * @description 住房类型
 */
public enum HouseOwnType {
  OWNER((short) 0, "自有"),
  RENT((short) 1, "租赁");
  @ApiModelProperty("值")
  private Short value;
  @ApiModelProperty("描述信息")
  private String description;

  HouseOwnType(Short value, String description) {
    this.value = value;
    this.description = description;
  }

  public static boolean validate(Short type) {
    if ((type != null) && (type.shortValue() == 0 || type.shortValue() == 1)) {
      return true;
    } else {
      return false;
    }
  }

  public static HouseOwnType getHouseOwnType(Short type) {
    if (HouseOwnType.validate(type)) {
      if (type.shortValue() == 0) {
        return OWNER;
      } else {
        return RENT;
      }
    } else {
      throw new IllegalArgumentException("接收到了非法的住房类型");
    }
  }

  public Short getValue() {
    return value;
  }

  public String getDescription() {
    return description;
  }
}
