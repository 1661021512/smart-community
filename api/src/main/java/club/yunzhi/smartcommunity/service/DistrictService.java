package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 区域
 */
public interface DistrictService {
  /**
   * 清除所有用户的缓存
   */
  void clearCache();

  /**
   * 清空缓存
   * @param user 用户
   */
  void clearCache(WebUser user);
  
  /**
   * 清空当然用户缓存
   * 复用clearCache方法
   */
  void clearCurrentUserCache();

  /**
   * 获取所有的县
   *
   * @return 所有的县
   */
  County getCounty();

  List<Long> getChildrenIdsWithItself(District district);

  List<District> getChildrenWithItself(District district);

  static List<District> getAllChildren(District district) {
    List<District> result = new ArrayList<>();
    result.addAll(district.getChildren());
    district.getChildren().forEach(district1 -> {
      result.addAll(DistrictService.getAllChildren(district1));
    });
    return result;
  }

  /**
   * 获取当前登录用户管理的区域
   *
   * @return
   */
  List<District> getManageDistrictsWithCurrentLoginUser();

  List<District> getManageDistrictsWithWebUser(WebUser webUser);

  List<District> getAllDistrictsByType(String type);

  /**
   * 获取当前登陆用户type类型的所有区域id
   *
   * @param type
   * @return
   */
  List<Long> getAllDistrictIdsByTypeOfCurrentUser(String type);

  /**
   * 获取当前登录用户管理的所有的楼栋
   */
  List<District> getManageBuildingsWithCurrentLoginUser();

  /**
   * 获取传入用户管理的所有的楼栋
   */
  List<District> getManageBuildingsWithWebUser(WebUser webUser);

  boolean checkManageAccessOfCurrentUser(Long districtId);

  boolean checkManageAccessOfWebUser(Long districtId, WebUser webUser);

  /**
   * 更新地图
   * @param id ID
   * @param geoJson 主地图
   * @param secondaryGeoJson 副地图
   */
  District updateGeoMap(Long id, Attachment geoJson, Attachment secondaryGeoJson);
}
