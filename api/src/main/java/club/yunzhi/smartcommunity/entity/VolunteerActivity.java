package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

/**
 * 志愿者活动
 */
@Entity
@SQLDelete(sql = "update `volunteer-activity` set deleted = 1 where id = ?")
public class VolunteerActivity extends SoftDeleteEntity {
  /**
   * 名称
   */
  @Column(nullable = false)
  private String name = "";

  /**
   * 结束日期
   */
  @Column(nullable = false)
  private Integer endDate;

  /**
   * 联系人
   */
  @Column(nullable = false)
  private String contact = "";

  /**
   * 发起组织
   */
  @Column(nullable = false)
  private String initiator = "";

  /**
   * 地点
   */
  @Column(nullable = false)
  private String place = "";

  /**
   * 计划招募人数
   */
  @Column(nullable = false)
  private Integer numberOfPlanned = 0;

  /**
   * 已审核人数
   */
  @Column(nullable = false)
  private Integer numberOfAudited = 0;

  /**
   * 已报名人数
   */
  @Column(nullable = false)
  private Integer numberOfApplicants = 0;

  /**
   * 活动详情
   */
  @Column(columnDefinition = "TEXT", nullable = false)
  private String detail;

  /**
   * 宣传图片
   */
  @JsonView(ImageJsonView.class)
  @OneToOne
  @NotFound
  private Attachment image;

  /**
   * 报名信息
   */
  @OneToMany(mappedBy = "volunteerActivity")
  @Where(clause = "deleted = false")
  @JsonView(SignUpInformationJsonView.class)
  private List<VolunteerActivitySignUp> volunteerActivitySignUp = new ArrayList<>();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public Integer getEndDate() {
    return endDate;
  }

  public void setEndDate(Integer endDate) {
    this.endDate = endDate;
  }

  public String getInitiator() {
    return initiator;
  }

  public void setInitiator(String initiator) {
    this.initiator = initiator;
  }


  public Attachment getImage() {
    return image;
  }

  public void setImage(Attachment image) {
    this.image = image;
  }

  public String getContact() {
    return contact;
  }

  public void setContact(String contact) {
    this.contact = contact;
  }

  public String getPlace() {
    return place;
  }

  public void setPlace(String place) {
    this.place = place;
  }


  public Integer getNumberOfPlanned() {
    return numberOfPlanned;
  }

  public void setNumberOfPlanned(Integer numberOfPlanned) {
    this.numberOfPlanned = numberOfPlanned;
  }

  public Integer getNumberOfAudited() {
    return numberOfAudited;
  }

  public void setNumberOfAudited(Integer numberOfAudited) {
    this.numberOfAudited = numberOfAudited;
  }

  public Integer getNumberOfApplicants() {
    return numberOfApplicants;
  }

  public void setNumberOfApplicants(Integer numberOfApplicants) {
    this.numberOfApplicants = numberOfApplicants;
  }

  public String getDetail() {
    return detail;
  }

  public void setDetail(String detail) {
    this.detail = detail;
  }


  public List<VolunteerActivitySignUp> getVolunteerActivitySignUp() {
    return volunteerActivitySignUp;
  }

  public void setVolunteerActivitySignUp(List<VolunteerActivitySignUp> volunteerActivitySignUp) {
    this.volunteerActivitySignUp = volunteerActivitySignUp;
  }

  public interface ImageJsonView {}
  public interface SignUpInformationJsonView {}
}
