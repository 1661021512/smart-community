package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

/**
 * 缓存接种人数数据表
 */
@Entity
@Table(indexes = @Index(columnList = "date"))
public class VaccinationCache {
  /**
   * id
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  /**
   * 对应区域
   */
  @OneToOne
  @JoinColumn(nullable = false)
  @NotFound
  @JsonView(DistrictJsonView.class)
  private District district;

  /**
   * 存储的日期：20210312（2021年3月12）
   */
  private Integer date;

  /**
   * 接种人数
   */
  private Long vaccinated;

  /**
   * 总人数
   */
  private Long total;

  public Long getVaccinated() {
    return vaccinated;
  }

  public void setVaccinated(Long vaccinated) {
    this.vaccinated = vaccinated;
  }

  public Long getTotal() {
    return total;
  }

  public void setTotal(Long total) {
    total = total;
  }

  public District getDistrict() {
    return district;
  }

  public void setDistrict(District district) {
    this.district = district;
  }

  public Integer getDate() {
    return date;
  }

  public void setDate(Integer date) {
    this.date = date;
  }

  public interface DistrictJsonView{}
}
