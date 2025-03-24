package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import java.sql.Timestamp;
import java.util.Calendar;

import static club.yunzhi.smartcommunity.entity.District.*;

/**
 * 居民管理查询
 */
public class ResidentSpecs {
  public final static Logger logger = LoggerFactory.getLogger(ResidentSpecs.class);

  /**
   * 按姓名查找
   *
   * @param name 姓名
   */
  public static Specification<Resident> containingName(String name) {
    if (name == null || name.trim().isEmpty()) {
      return Specification.where(null);

    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
  }

  /**
   * 属于某个区域
   * <p>
   * 根据区域类型动态生成查询条件
   * </p>
   *
   * @param district 区域
   */
  public static Specification<Resident> belongDistrict(District district) {
    if (district == null ||
        district.getId() == null ||
        district.getType() == null ||
        TYPE_COUNTY.equals(district.getType())) {
      logger.debug("未传入区域信息或区域ID为null或传入了区域为根区域，忽略查询条件");
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) -> {
      logger.debug("分别按楼、小区、社区、乡镇（默认）进行查询");
      Join<Resident, Building> buildingJoin = root.join("houses")
          .join("building", JoinType.LEFT);
      Long districtId = district.getId();
      switch (district.getType()) {
        case TYPE_BUILDING:
          return criteriaBuilder.equal(buildingJoin.get("id").as(Long.class), districtId);
        case TYPE_VILLAGE:
          return criteriaBuilder.equal(buildingJoin.join("parent").get("id").as(Long.class),
              districtId);
        case TYPE_COMMUNITY:
          return criteriaBuilder.equal(buildingJoin
                  .join("parent", JoinType.LEFT)
                  .join("parent", JoinType.LEFT)
                  .get("id").as(Long.class),
              districtId);
        default:
          return criteriaBuilder.equal(buildingJoin
                  .join("parent", JoinType.LEFT)
                  .join("parent", JoinType.LEFT)
                  .join("parent", JoinType.LEFT)
                  .get("id").as(Long.class),
              districtId);
      }
    };
  }

  /**
   * 按年龄范围找
   *
   * @param beginAge 开始
   * @param endAge   结束
   */
  public static Specification<Resident> betweenAge(Integer beginAge, Integer endAge) {
    Specification<Resident> specification = Specification.where(null);
    if (beginAge == null && endAge == null) {
      return specification;
    }


    if (beginAge != null) {
      Calendar calendar = Calendar.getInstance();
      calendar.add(Calendar.YEAR, -beginAge);
      Timestamp beginTimestamp = new Timestamp(calendar.getTimeInMillis());
      specification = specification.and((root, criteriaQuery, criteriaBuilder) ->
          criteriaBuilder.lessThan(root.get("dateOfBirth").as(Timestamp.class), beginTimestamp));
    }

    if (endAge != null) {
      Calendar calendar = Calendar.getInstance();
      calendar.add(Calendar.YEAR, -endAge);
      Timestamp endTimestamp = new Timestamp(calendar.getTimeInMillis());
      specification = specification.and((root, criteriaQuery, criteriaBuilder) ->
          criteriaBuilder.greaterThan(root.get("dateOfBirth").as(Timestamp.class), endTimestamp));
    }

    return specification;
  }

  /**
   * 按宗教查询，同name
   *
   * @param religion 宗教名称
   */
  public static Specification<Resident> containingReligion(String religion) {
    if (religion == null || religion.trim().isEmpty()) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(root.get("religion").as(String.class), String.format("%%%s%%", religion.trim()));
  }

  /**
   * 工作地点
   *
   * @param workPlace 工作地点
   */
  public static Specification<Resident> containingWorkPlace(String workPlace) {
    if (workPlace == null || workPlace.trim().isEmpty()) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(root.get("workPlace").as(String.class), String.format("%%%s%%", workPlace.trim()));
  }

  public static Specification<Resident> equalHouseGrider(Grider grider) {
    if (grider == null || grider.getId() == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> {
      Join<Resident, House> houseJoin = root.join("houses");
      return criteriaBuilder.equal(houseJoin.join("grider", JoinType.LEFT)
          .get("id").as(Long.class), grider.getId());
    };
  }

  /**
   * 按身份证号查询
   *
   * @param idNumber 身份证号
   */
  public static Specification<Resident> equalIdNumber(String idNumber) {
    if (idNumber == null || idNumber.trim().isEmpty()) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(root.get("idNumber").as(String.class), String.format("%s%%", idNumber.trim()));
  }

  /**
   * 去除
   * 当一个居民有多个住房时，会生成两条记录
   * 而此方法的作用便是去除重复的记录
   */
  public static Specification<Resident> distinct() {
    return (root, criteriaQuery, criteriaBuilder) -> {
      criteriaQuery.distinct(true);
      return criteriaQuery.getRestriction();
    };
  }

  /**
   * 根据电话查
   *
   * @param phone 电话号码
   */
  public static Specification<Resident> equalPhone(String phone) {
    if (phone == null || phone.trim().isEmpty()) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.like(root.get("phone").as(String.class), String.format("%s%%", phone.trim()));
  }

  public static Specification<Resident> equalVaccinated(Boolean beVaccinated) {
    if (beVaccinated == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("beVaccinated").as(Boolean.class), beVaccinated);
  }

  /**
   * 根据文化程度查
   *
   * @param education 教育程度
   */
  public static Specification<Resident> isEducation(Short education) {
    if (education == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("education").as(Short.class), education);
  }

  /**
   * 根据民族查
   *
   * @param nationality 民族
   */
  public static Specification<Resident> isNationality(Short nationality) {
    if (nationality == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("nationality").as(Short.class), nationality);
  }

  /**
   * 根据政治面貌查
   *
   * @param politicalClimate 政治面貌
   */
  public static Specification<Resident> isPoliticalClimate(Short politicalClimate) {
    if (politicalClimate == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("politicalClimate").as(Short.class), politicalClimate);
  }

  /**
   * 按性别查找
   *
   * @param sex 性别
   */
  public static Specification<Resident> isSex(Boolean sex) {
    if (sex == null) {
      return Specification.where(null);

    }
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("sex").as(Boolean.class), sex);
  }
}
