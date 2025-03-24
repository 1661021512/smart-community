package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

/**
 * 基本实体类，用于抽象出其他实体类公共字段
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
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

  @ManyToOne
  @JsonView(CreateUserJsonView.class)
  @NotFound
  @CreatedBy
  protected User createUser;

  @ManyToOne
  @JsonView(UpdateUserJsonView.class)
  @NotFound
  @LastModifiedBy
  protected User updateUser;

  public BaseEntity() {
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

  public User getCreateUser() {
    return createUser;
  }

  public void setCreateUser(User createUser) {
    this.createUser = createUser;
  }

  public User getUpdateUser() {
    return updateUser;
  }

  public void setUpdateUser(User updateUser) {
    this.updateUser = updateUser;
  }

  public Timestamp getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Timestamp updateTime) {
    this.updateTime = updateTime;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    BaseEntity that = (BaseEntity) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public interface DeleteAtJsonView {
  }

  public interface CreateTimeJsonView {
  }

  public interface DeletedJsonView {
  }

  public interface UpdateTimeJsonView {
  }

  public interface CreateUserJsonView {
  }

  public interface UpdateUserJsonView {
  }
}
