package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.enums.UserDetailType;
import club.yunzhi.smartcommunity.model.AuthUserDetails;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/1/10
 * @blog https://segmentfault.com/u/myskies
 * @description WEB 端用户
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"username", "deleteAt"}))
@SQLDelete(sql = "update `web_user` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class WebUser extends SoftDeleteEntity implements AuthUserDetails {

  /**
   * 密码加密
   */
  private static PasswordEncoder passwordEncoder;

  public static void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    WebUser.passwordEncoder = passwordEncoder;
  }

  private String username;

  @JsonView(User.PasswordJsonView.class)
  private String password;

  @OneToOne
  @JoinColumn(nullable = false)
  @JsonView(UserJsonView.class)
  User user = new User();

  public void setPassword(String password) {
    if (WebUser.passwordEncoder == null) {
      throw new RuntimeException("未设置User实体的passwordEncoder，请调用set方法设置");
    }
    this.password = WebUser.passwordEncoder.encode(password);
  }


  public String getUsername() {
    return username;
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

  @Override
  public UserDetailType getType() {
    return UserDetailType.WEB;
  }

  public String getName() {
    if (this.getUser() == null) {
      throw new RuntimeException("对应的用户不可能为null");
    }
    return this.getUser().getName();
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public List<Role> getRoles() {
    return this.getUser().getRoles();
  }

  @JsonView({User.DistrictJsonView.class, DistrictJsonView.class})
  public District getDistrict() {
    return this.getUser().getDistrict();
  }

  public void setName(String name) {
    this.getUser().setName(name);
  }

  public Integer getStatus() {
    return this.getUser().getStatus();
  }

  public void setRoles(List<Role> roles) {
    this.getUser().setRoles(roles);
  }

  public void setDistrict(District district) {
    this.getUser().setDistrict(district);
  }

  public void setStatus(Integer status) {
    this.getUser().setStatus(status);
  }

  @Override
  public Collection<Role> getAuthorities() {
    return this.getUser().getAuthorities();
  }

  public String getPassword() {
    return password;
  }

  public interface DistrictJsonView {
  }

  public interface UserJsonView {
  }
}
