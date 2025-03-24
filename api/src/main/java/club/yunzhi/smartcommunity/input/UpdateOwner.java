package club.yunzhi.smartcommunity.input;

public class UpdateOwner {
  /**
   * 居民ID
   */
  private Long residentId;

  /**
   * 是否户主
   */
  private Boolean isOwner;

  public Long getResidentId() {
    return residentId;
  }

  public void setResidentId(Long residentId) {
    this.residentId = residentId;
  }

  public Boolean getIsOwner() {
    return isOwner;
  }

  public void setIsOwner(Boolean owner) {
    isOwner = owner;
  }
}
