package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.enums.UserDetailType;
import club.yunzhi.smartcommunity.model.AuthUserDetails;
import club.yunzhi.smartcommunity.util.SMSUtils;
import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.exception.ValidationException;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;


/**
 * 微信用户
 * 该实体不启用软删除，禁用用户可以设置enabled字段
 * 原因：
 * 用户是微信分配的，删除没有任何意义。如果不想让该用户登录，将其状态设置为冻结即可（enabled = false)
 *
 * @author panjie
 */
@Entity
public class WechatUser implements AuthUserDetails {
  public static final Short EDUCATION_JUNIOR_HIGH_SCHOOL_AND_BELOW = 0;
  public static final Short EDUCATION_HIGH_SCHOOL = 1;
  public static final Short EDUCATION_COLLEGE = 2;
  public static final Short EDUCATION_BACHELOR_DEGREE_AND_ABOVE = 3;
  /**
   * 用于获取与微信后台交换当前用户加密信息的密钥，该密钥不定期过期，过期后应该重新使用code更新
   */
  @JsonView(SessionKeyJsonView.class)
  @Transient
  private String sessionKey;

  @Id
  private String id;

  @Column(nullable = false)
  private String name = "";

  /**
   * 手机号
   */
  @JsonView(MobileJsonView.class)
  private String mobile;

  /**
   * 联系地址
   */
  private String address = "";

  /**
   * 性别
   */
  private Boolean sex;

  /**
   * 生日
   */
  private Integer birthday;

  /**
   * 教育程度
   */
  private Short education;

  /**
   * 介绍
   */
  private String introduction = "";

  /**
   * 是否启用
   */
  private boolean enabled = true;

  /**
   * 是否注册用户
   */
  private boolean registered = false;

  @ManyToOne
  @JoinColumn(nullable = false)
  User user = new User();

  public WechatUser() {
  }

  public WechatUser(String sessionKey, String openid) {
    this.sessionKey = sessionKey;
    this.id = openid;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Boolean getSex() {
    return sex;
  }

  public void setSex(Boolean sex) {
    this.sex = sex;
  }

  public Integer getBirthday() {
    return birthday;
  }

  public void setBirthday(Integer birthday) {
    this.birthday = birthday;
  }

  public Short getEducation() {
    return education;
  }

  public void setEducation(Short education) {
    this.education = education;
  }

  public String getIntroduction() {
    return introduction;
  }

  public void setIntroduction(String introduction) {
    this.introduction = introduction;
  }

  public User getUser() {
    return user;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public String getMobile() {
    return mobile;
  }

  public void setMobile(String phone) {
    if (!SMSUtils.isMobile(phone)) {
      throw new ValidationException("手机号格式不正确");
    }
    this.mobile = phone;
  }

  public void setUser(User user) {
    this.registered = user.getId() != null;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setOpenid(String openid) {
    this.setId(openid);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getOpenid() {
    return this.getId();
  }

  public String getSessionKey() {
    return sessionKey;
  }

  public void setSessionKey(String sessionKey) {
    this.sessionKey = sessionKey;
  }

  public boolean isRegistered() {
    return registered;
  }

  public void setRegistered(boolean registered) {
    this.registered = registered;
  }

  @Override
  public UserDetailType getType() {
    return UserDetailType.WE_CHAt;
  }

  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.getUser().getAuthorities();
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return this.getOpenid();
  }

  @Override
  public boolean isAccountNonExpired() {
    return this.getUser().isAccountNonExpired();
  }

  @Override
  public boolean isAccountNonLocked() {
    return this.getUser().isAccountNonLocked();
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return this.getUser().isCredentialsNonExpired();
  }

  @Override
  public boolean isEnabled() {
    return this.getUser().isEnabled();
  }

  public interface SessionKeyJsonView {
  }

  public interface MobileJsonView {
  }
}
