package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.enums.RoleType;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 角色.
 */
@Entity
@SQLDelete(sql = "update `role` set deleted = 1 where id = ?")
public class Role extends SoftDeleteEntity implements GrantedAuthority {
  @Column(nullable = false, unique = true)
  private String name;

  @Column(nullable = false, unique = true)
  private String value;

  private int weight;

  /**
   * 该角色的子角色
   */
  @ManyToMany
  @Where(clause = "deleted = false")
  @JsonView(ChildrenJsonView.class)
  private List<Role> children = new ArrayList<>();

  /**
   * 是否系统内置角色
   */
  private Boolean systemed = false;

  public Role() {
  }

  public Role(String name, String value, int weight, Boolean systemed) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    this.systemed = systemed;
  }

  public Role(RoleType roleType, int weight, Boolean systemed) {
    this(roleType.getName(), roleType.getValue(), weight, systemed);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public int getWeight() {
    return weight;
  }

  public void setWeight(int weight) {
    this.weight = weight;
  }


  public Boolean getSystemed() {
    return systemed;
  }

  public void setSystemed(Boolean systemed) {
    this.systemed = systemed;
  }

  public List<Role> getChildren() {
    return children;
  }

  public void setChildren(List<Role> children) {
    this.children = children;
  }

  @Override
  public String getAuthority() {
    return this.value;
  }

  public interface ChildrenJsonView {
  }
}