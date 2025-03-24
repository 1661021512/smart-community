package club.yunzhi.smartcommunity.entity;

import org.hibernate.annotations.SQLDelete;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 矫正类型
 */
@Entity
@SQLDelete(sql = "update `crimed_type` set deleted = 1 where id = ?")
public class CrimedType extends SoftDeleteEntity {
  public static final String TABLE_NAME = "crimed_type";
  /**
   * 矫正类型.
   */
  public static Long LABOR_EDUCATION = 1L;
  public static Long IN_PRISON = 2L;
  public static Long DRUG = 3L;

  /**
   * 不自动生成 ID
   */
  @Id
  protected Long id;

  @Column(nullable = false)
  private String name;


  public CrimedType() {
  }

  public CrimedType(Long id) {
    this.id = id;
  }

  public CrimedType(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
