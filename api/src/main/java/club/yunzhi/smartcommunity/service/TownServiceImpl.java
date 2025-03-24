package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.repository.CountyRepository;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.TownRepository;
import club.yunzhi.smartcommunity.repository.specs.TownSpecs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TownServiceImpl implements TownService {
  private final Logger logger = LoggerFactory.getLogger(TownServiceImpl.class);
  /**
   * 区域
   */
  private final TownRepository townRepository;
  private final CountyRepository countyRepository;
  private final DistrictRepository districtRepository;
  private final DistrictService districtService;
  private final CommunityService communityService;

  public TownServiceImpl(TownRepository townRepository,
                         CountyRepository countyRepository,
                         DistrictRepository districtRepository,
                         DistrictService districtService,
                         CommunityService communityService) {
    this.townRepository = townRepository;
    this.countyRepository = countyRepository;
    this.districtRepository = districtRepository;
    this.districtService = districtService;
    this.communityService = communityService;
  }

  @Override
  public List<Town> findAll() {
    return (List<Town>) this.townRepository.findAll();
  }

  /**
   * 新增
   * 1. 先增加区域
   * 2. 再增加乡镇
   *
   * @param town 乡镇
   * @return 乡镇
   */
  @Override
  public Town save(Town town) {
    logger.debug("判断数据是否合格");
    Assert.notNull(town.getName(), "name不能为空");
    Assert.notNull(town.getPinyin(), "pinyin不能为空");

    Town newTown = new Town();
    newTown.setName(town.getName());
    newTown.setPinyin(town.getPinyin());
    newTown.setGeoJson(town.getGeoJson());
    newTown.setSecondaryGeoJson(town.getSecondaryGeoJson());
    newTown.setCounty(this.countyRepository.findTopBydeletedIsFalseOrderByIdDesc().get());
    return this.townRepository.save(newTown);
  }

  @Override
  public void delete(Long id) {
    Town town = getById(id);

    logger.debug("获取乡镇下的社区并删除");
    List<District> communities = town.getCommunities();
    communities.forEach(district -> {
      this.communityService.delete(district.getId());
    });

    this.districtRepository.deleteById(town.getId());
  }


  @Override
  public Town getById(Long id) {
    return this.townRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关乡镇"));
  }

  @Override
  public Page<Town> page(String name, Pageable pageable) {
    logger.debug("获取当前登陆用户的区域及子区域中的乡镇id");
    List<Long> countyIds = districtService.getAllDistrictIdsByTypeOfCurrentUser(District.TYPE_COUNTY);

    return this.townRepository.findAll(TownSpecs.containingName(name)
        .and(TownSpecs.inCountyIds(countyIds)), pageable);
  }

  @Override
  public Town update(Long id, Town town1) {
    Town town = getById(id);

    logger.debug("判断数据是否合格");
    Assert.notNull(town1.getName(), "name不能为空");
    Assert.notNull(town1.getPinyin(), "pinyin不能为空");
    Assert.notNull(town1.getGeoJson(), "geoJson地图信息不能为空");

    logger.debug("保存数据");
    town.setName(town1.getName());
    town.setPinyin(town1.getPinyin());
    town.setGeoJson(town1.getGeoJson());
    town.setSecondaryGeoJson(town1.getSecondaryGeoJson());
    return this.townRepository.save(town);
  }

  @Override
  public Boolean existByName(String name) {
    return this.townRepository.count(TownSpecs.equalName(name)) > 0;
  }
}
