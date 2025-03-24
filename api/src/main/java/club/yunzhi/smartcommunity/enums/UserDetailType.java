package club.yunzhi.smartcommunity.enums;

import io.swagger.annotations.ApiModelProperty;

/**
 * 用户类型
 */
public enum UserDetailType {
  WEB("WEB用户", "web"),
  WE_CHAt("微信用户", "weChat")
  ;
  @ApiModelProperty("名称")
  private String name;

  @ApiModelProperty("值")
  private String value;

  UserDetailType(String name, String value) {
    this.name = name;
    this.value = value;
  }

  public String getName() {
    return name;
  }

  public String getValue() {
    return value;
  }
}
