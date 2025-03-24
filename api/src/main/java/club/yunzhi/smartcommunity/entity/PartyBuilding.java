package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.*;

/**
 * 党建实体
 */
@Entity
// 建立索引时，如果外建就使用xxxx_xxx，如果是当前实体的属性，则使用xxxXxxx
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"duty_id", "district_id", "deleteAt"}))
@SQLDelete(sql = "update `party_building` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class PartyBuilding extends SoftDeleteEntity {
  /**
   * 人员姓名
   */
  private String personName;

  /**
   * 岗位所在的区域
   */
  @ManyToOne
  @NotFound
  @JsonView(DistrictJsonView.class)
  private District district;

  /**
   * 职务
   */
  @ManyToOne
  @NotFound
  @JsonView(DutyJsonView.class)
  private Duty duty;

  public String getPersonName() {
    return personName;
  }

  public void setPersonName(String personalName) {
    this.personName = personalName;
  }

  public District getDistrict() {
    return district;
  }

  public void setDistrict(District district) {
    this.district = district;
  }

  public Duty getDuty() {
    return duty;
  }

  public void setDuty(Duty duty) {
    this.duty = duty;
  }

  public interface UserJsonView {
  }

  public interface DistrictJsonView {
  }

  public interface DutyJsonView {
  }
}
