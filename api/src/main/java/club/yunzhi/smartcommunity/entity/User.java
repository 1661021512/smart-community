package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.enums.UserDetailType;
import club.yunzhi.smartcommunity.exception.NotSupportedException;
import club.yunzhi.smartcommunity.model.AuthUserDetails;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.*;
;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.persistence.Entity;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 用户实体类
 */
@Entity
public class User implements UserDetails {
  /**
   * 用户状态.
   */
  public static Integer STATUS_FROZEN = 0;
  public static Integer STATUS_NORMAL = 1;
  /**
   * id
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  @CreationTimestamp
  @JsonView(BaseEntity.CreateTimeJsonView.class)
  protected Timestamp createTime;

  @UpdateTimestamp
  @JsonView(BaseEntity.UpdateTimeJsonView.class)
  protected Timestamp updateTime;
  /**
   * 密码加密
   */
  public static PasswordEncoder passwordEncoder;

  private String name;

  /**
   * 状态：
   * 0 冻结中
   * 1 正常.
   */
  private Integer status = User.STATUS_NORMAL;

  @ManyToOne
  @NotFound
  @JoinColumn(nullable = false)
  @JsonView(DistrictJsonView.class)
  private District district;

  /**
   * 角色.
   */
  @ManyToMany
  @Where(clause = "deleted = false")
  @JsonView(RolesJsonView.class)
  private List<Role> roles = new ArrayList<>();

  @Override
  @JsonView(UsernameJsonView.class)
  public String getUsername() {
    throw new NotSupportedException("不支持该方法，请使用其它关联用户的方法");
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return this.status.equals(STATUS_NORMAL);
  }

  @Override
  @JsonView(AuthoritiesJsonView.class)
  public Collection<Role> getAuthorities() {
    return this.roles;
  }

  @Override
  @Deprecated
  @JsonView(GetPasswordJsonView.class)
  public String getPassword() {
    throw new NotSupportedException("不支持该方法，请使用其它关联用户的方法");
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Role> getRoles() {
    return this.roles;
  }

  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public District getDistrict() {
    return district;
  }

  public void setDistrict(District district) {
    this.district = district;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Timestamp createTime) {
    this.createTime = createTime;
  }

  public Timestamp getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Timestamp updateTime) {
    this.updateTime = updateTime;
  }

  public interface PasswordJsonView {
  }

  public interface RolesJsonView {
  }

  public interface DistrictJsonView {
  }

  private class AuthoritiesJsonView {
  }

  private class UsernameJsonView {
  }

  private class GetPasswordJsonView {
  }
}
