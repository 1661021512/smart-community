package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.*;
import java.util.List;

import static club.yunzhi.smartcommunity.entity.District.TYPE_COUNTY;

/**
 * 县实体
 */
@Entity
@SQLDelete(sql = "update `district` set deleted = 1 where id = ?")
@DiscriminatorValue(TYPE_COUNTY)
public class County extends District {
  public County() {
    this.setType(District.TYPE_COUNTY);
  }

  @JsonView(TownsJsonView.class)
  public List<District> getTowns() {
    return this.getChildren();
  }

  public void setTowns(List<District> towns) {
    this.setChildren(towns);
  }

  public interface TownsJsonView {
  }
}
