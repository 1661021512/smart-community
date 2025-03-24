package club.yunzhi.smartcommunity.entity.listener;

import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.entity.Unit;
import club.yunzhi.smartcommunity.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Optional;

@Component
public class HouseListener {
  static private UnitRepository unitRepository;

  @Autowired
  public void init(UnitRepository unitRepository) {
    HouseListener.unitRepository = unitRepository;
  }

  @PrePersist
  @PreUpdate
  public void setBuilding(House house) {
    if (house.getUnit() != null && house.getUnit().getId() != null) {
      Optional<Unit> unitOptional = this.unitRepository.findById(house.getUnit().getId());
      if (unitOptional.isPresent()) {
        house.setBuilding(unitOptional.get().getBuilding());
      }
    }
  }
}
