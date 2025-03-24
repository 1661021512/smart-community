package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.repository.CountyRepository;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 区域
 */
@Service
public class DistrictServiceImpl implements DistrictService {
  private final Logger logger = LoggerFactory.getLogger(DistrictServiceImpl.class);
  private final CountyRepository countyRepository;
  @Autowired
  private WebUserService webUserService;
  private final ExpiringCacheMap<WebUser, List<District>> expiringCacheMap = new ExpiringCacheMap<>();
  private final DistrictRepository districtRepository;

  public DistrictServiceImpl(CountyRepository countyRepository,
                             DistrictRepository districtRepository) {
    this.countyRepository = countyRepository;
    this.districtRepository = districtRepository;
  }

  @Override
  public void clearCache() {
    this.expiringCacheMap.clear();
  }

  @Override
  public void clearCache(WebUser user) {
    this.expiringCacheMap.clear(user);
  }

  @Override
  public void clearCurrentUserCache() {
    this.expiringCacheMap.clear(this.webUserService.getCurrentLoginWebUser().get());
  }

  @Override
  public County getCounty() {
    return this.countyRepository.findTopBydeletedIsFalseOrderByIdDesc().orElseThrow(() -> new EntityNotFoundException("系统中最少需要存在一个县"));
  }

  @Override
  public List<Long> getChildrenIdsWithItself(District district) {
    return this.getChildrenWithItself(district).stream().map(
        district1 -> district1.getId()
    ).collect(Collectors.toList());
  }

  @Override
  public List<District> getChildrenWithItself(District district) {
    List<District> districts = new ArrayList<>();
    if (district != null && district.getId() != null) {
      districts.add(district);
    }

    district.getChildren().forEach(d -> {
      districts.addAll(this.getChildrenWithItself(d));
    });

    return districts;
  }

  /**
   * 该方法调用频繁，于是我们增加个缓存
   * 所有的缓存都写到cacheService中，有利于管理
   */
  @Override
  public List<District> getManageDistrictsWithCurrentLoginUser() {
    List<District> result;
    Optional<WebUser> optionalUser = this.webUserService.getCurrentLoginWebUser();
    if (this.expiringCacheMap.containsKey(optionalUser.orElseThrow(RuntimeException::new))) {
      result = this.expiringCacheMap.get(optionalUser.get());
    } else {
      result = optionalUser.map(user -> this.getChildrenWithItself(user.getDistrict())).orElseGet(ArrayList::new);
      this.expiringCacheMap.put(optionalUser.get(), result);
    }
    return result;
  }

  @Override
  public List<District> getManageDistrictsWithWebUser(WebUser webUser) {
    List<District> result;
    Optional<WebUser> optionalUser = Optional.of(webUser);
    if (this.expiringCacheMap.containsKey(optionalUser.orElseThrow(RuntimeException::new))) {
      result = this.expiringCacheMap.get(optionalUser.get());
    } else {
      result = optionalUser.map(user -> this.getChildrenWithItself(user.getDistrict())).orElseGet(ArrayList::new);
      this.expiringCacheMap.put(optionalUser.get(), result);
    }
    return result;
  }

  @Override
  public List<District> getAllDistrictsByType(String type) {
    return this.districtRepository.findAllByTypeAndDeletedIsFalse(type);
  }

  @Override
  public List<Long> getAllDistrictIdsByTypeOfCurrentUser(String type) {
    List<District> districts = getManageDistrictsWithCurrentLoginUser();
    List<Long> ids = new ArrayList<>();

    districts.forEach(district -> {
      if (district != null && district.getId() != null && district.getType().equals(type)) {
        ids.add(district.getId());
      }
    });

    return ids;
  }

  @Override
  public List<District> getManageBuildingsWithCurrentLoginUser() {
    List<District> districts = this.getManageDistrictsWithCurrentLoginUser();
    return districts.stream().filter(district -> district.getType().equals(District.TYPE_BUILDING)).collect(Collectors.toList());
  }

  @Override
  public List<District> getManageBuildingsWithWebUser(WebUser webUser) {
    List<District> districts = this.getManageDistrictsWithWebUser(webUser);
    return districts.stream().filter(district -> district.getType().equals(District.TYPE_BUILDING)).collect(Collectors.toList());
  }

  @Override
  public boolean checkManageAccessOfCurrentUser(Long districtId) {
    for (District district : this.getManageDistrictsWithCurrentLoginUser()) {
      if (district.getId().equals(districtId)) {
        return true;
      }
    }
    return false;
  }

  @Override
  public boolean checkManageAccessOfWebUser(Long districtId, WebUser webUser) {
    for (District district : this.getManageDistrictsWithWebUser(webUser)) {
      if (district.getId().equals(districtId)) {
        return true;
      }
    }
    return false;
  }

  @Override
  public District updateGeoMap(Long id, Attachment geoJson, Attachment secondaryGeoJson) {
    District district = this.districtRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("区域ID未找到" + id));
    Assert.notNull(geoJson, "主地图信息不能为空");
    Assert.notNull(geoJson.getId(), "主地图信息ID不能为空");

    district.setSecondaryGeoJson(secondaryGeoJson);
    district.setGeoJson(geoJson);
    return this.districtRepository.save(district);
  }

}
