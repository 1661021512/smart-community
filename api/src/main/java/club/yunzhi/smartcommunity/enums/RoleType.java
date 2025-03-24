package club.yunzhi.smartcommunity.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel("角色")
public enum RoleType {
  ADMIN("管理员", "admin"),
  USER("普通用户", "user"),
  GRIDER("网格员", "grider");
  @ApiModelProperty("名称")
  private String name;
  @ApiModelProperty("值")
  private String value;

  RoleType(String name, String value) {
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
