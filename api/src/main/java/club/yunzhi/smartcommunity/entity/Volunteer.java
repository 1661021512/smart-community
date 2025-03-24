package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.util.SMSUtils;
import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.exception.ValidationException;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

/**
 * 志愿者
 */
@Entity
@SQLDelete(sql = "update `volunteer` set deleted = 1 where id = ?")
public class Volunteer extends SoftDeleteEntity {

  /**
   * 参与活动
   */
  @OneToMany(mappedBy = "volunteer")
  @Where(clause = "deleted = false")
  @JsonView(VolunteerActivitySignUpsJsonView.class)
  private List<VolunteerActivitySignUp> volunteerActivitySignUps = new ArrayList<>();

  /**
   * 用户信息
   */
  @OneToOne
  @JsonView(WechatUserJsonView.class)
  @JoinColumn(nullable = false)
  private WechatUser wechatUser;

  /**
   * 是否为明星
   */
  @Column(nullable = false)
  private Boolean beStar = false;

  /**
   * 排名
   */
  @Column(nullable = false)
  private Integer weight = 0;

  /**
   * 联系方式
   * 防止和微信中登录的手机号不相同的情况发生
   */
  @Column(nullable = false)
  private String phone = "";

  public WechatUser getWechatUser() {
    return wechatUser;
  }

  public void setWechatUser(WechatUser wechatUser) {
    this.wechatUser = wechatUser;
  }

  public Boolean getBeStar() {
    return beStar;
  }

  public void setBeStar(Boolean beStar) {
    this.beStar = beStar;
  }

  public Integer getWeight() {
    return weight;
  }

  public void setWeight(Integer weight) {
    this.weight = weight;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    if (!SMSUtils.isMobile(phone)) {
      throw new ValidationException("手机号格式不正确");
    }
    this.phone = phone;
  }

  public List<VolunteerActivitySignUp> getVolunteerActivitySignUps() {
    return volunteerActivitySignUps;
  }

  public void setVolunteerActivitySignUps(List<VolunteerActivitySignUp> volunteerActivitySignUps) {
    this.volunteerActivitySignUps = volunteerActivitySignUps;
  }

  public interface WechatUserJsonView {
  }

  public interface VolunteerActivityJsonView {
  }

  public interface VolunteerActivitySignUpsJsonView {
  }
}
