package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import org.springframework.data.jpa.domain.Specification;

/**
 * 志愿者活动查询
 */
public class VolunteerActivitySpecs {
  /**
   * 根据名称
   *
   * @param name 名称
   */
  public static Specification<VolunteerActivity> containingName(String name) {
    if (name == null || name.trim().isEmpty()) {
      return Specification.where(null);
    } else {
      return (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    }
  }

  /**
   * 根据截止日期
   * 特殊情况：日期组件不选择日期时传输19700101，此情况应当返回全部数据
   *
   * @param endDate 截止日期
   */
  public static Specification<VolunteerActivity> equalEndDate(Integer endDate) {
    if (endDate == null || endDate == 19700101) {
      return Specification.where(null);
    } else {
      return (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.equal(root.get("endDate").as(Integer.class), endDate);
    }
  }

  /**
   * 根据状态和当天日期查询此活动是否完成
   * 当state为0时，查询进行中，即endDate>=todayDate
   * 当state为1时，查询已结束，即endDate<todayDate
   *
   * @param state      状态
   * @param todayDate  当天日期
   */
  public static Specification<VolunteerActivity> isActive(Short state, Integer todayDate) {
    if (state == null) {
      return Specification.where(null);
    } else {
      return state == 0 ?
              (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.greaterThan(root.get("endDate").as(Integer.class), todayDate)
              : (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.lessThanOrEqualTo(root.get("endDate").as(Integer.class), todayDate);
    }
  }

  /**
   * 根据联系人
   *
   * @param contact 联系人
   */
  public static Specification<VolunteerActivity> containingContact(String contact) {
    if (contact == null || contact.trim().isEmpty()) {
      return Specification.where(null);
    } else {
      return (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.like(root.get("contact").as(String.class), String.format("%%%s%%", contact.trim()));
    }
  }

  /**
   * 根据地点
   *
   * @param place 地点
   */
  public static Specification<VolunteerActivity> containingPlace(String place) {
    if (place == null || place.trim().isEmpty()) {
      return Specification.where(null);
    } else {
      return (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.like(root.get("place").as(String.class), String.format("%%%s%%", place.trim()));
    }
  }
}
