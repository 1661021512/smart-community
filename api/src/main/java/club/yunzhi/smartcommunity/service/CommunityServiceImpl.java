package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.repository.CommunityRepository;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.specs.CommunitySpecs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

/**
 * 社区管理服务层实现
 */
@Service
public class CommunityServiceImpl implements CommunityService {
  private final Logger logger = LoggerFactory.getLogger(CommunityServiceImpl.class);
  private final CommunityRepository communityRepository;
  private final DistrictRepository districtRepository;
  private final DistrictService districtService;
  private final VillageService villageService;

  public CommunityServiceImpl(CommunityRepository communityRepository,
                              DistrictRepository districtRepository,
                              DistrictService districtService,
                              VillageService villageService) {
    this.communityRepository = communityRepository;
    this.districtRepository = districtRepository;
    this.districtService = districtService;
    this.villageService = villageService;
  }
  @Override
  public Community save(Community community) {
    Community newCommunity = new Community();

    logger.debug("判断数据是否合格");
    Assert.notNull(community.getName(), "name不能为空");
    Assert.notNull(community.getPinyin(), "pinyin不能为空");
    Assert.notNull(community.getTown().getId(), "未选择乡镇");

    logger.debug("保存数据");
    newCommunity.setName(community.getName());
    newCommunity.setPinyin(community.getPinyin());
    newCommunity.setTown(community.getTown());
    newCommunity.setGeoJson(community.getGeoJson());

    return this.communityRepository.save(newCommunity);
  }

  @Override
  public void delete(Long id) {
    Community community = getById(id);

    logger.debug("获取社区中的小区");
    List<District> villages = community.getVillages();
    villages.forEach(village -> {
      this.villageService.delete(village.getId());
    });

    this.districtRepository.deleteById(community.getId());
  }

  @Override
  public List<Community> findAll() {
    return (List<Community>) this.communityRepository.findAll();
  }

  @Override
  public Community getById(Long id) {
    return this.communityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关社区"));
  }

  @Override
  public Page<Community> page(String name, Pageable pageable) {
    logger.debug("获取当前登陆用户的区域及子区域中的乡镇id");
    List<Long> townIds = districtService.getAllDistrictIdsByTypeOfCurrentUser(District.TYPE_TOWN);

    return this.communityRepository.findAll(CommunitySpecs.containingName(name)
        .and(CommunitySpecs.inTownIds(townIds)), pageable);
  }

  @Override
  public Community update(Long id, Community community) {
    Community community1 = this.getById(id);

    logger.debug("判断数据是否合格");
    Assert.notNull(community.getName(), "name不能为空");
    Assert.notNull(community.getPinyin(), "pinyin不能为空");
    Assert.notNull(community.getTown().getId(), "未选择乡镇");

    logger.debug("保存数据");
    community1.setName(community.getName());
    community1.setPinyin(community.getPinyin());
    community1.setTown(community.getTown());
    community1.setGeoJson(community.getGeoJson());

    return this.communityRepository.save(community1);
  }

  @Override
  public List<Community> getAllByTownId(Long townId) {
    if (townId == null) {
      return new ArrayList<>();
    }

    return this.communityRepository.findAllByParentId(townId);
  }

  @Override
  public Boolean existByName(String name) {
    return this.communityRepository.findOne(CommunitySpecs.equalName(name)).isPresent();
  }
}
