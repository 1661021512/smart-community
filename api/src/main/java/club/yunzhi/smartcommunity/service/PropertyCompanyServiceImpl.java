package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.PropertyCompany;
import club.yunzhi.smartcommunity.entity.Village;
import club.yunzhi.smartcommunity.repository.PropertyCompanyRepository;
import club.yunzhi.smartcommunity.repository.VillageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.Comparator;
import java.util.List;

/**
 * 物业公司
 */
@Service
public class PropertyCompanyServiceImpl implements PropertyCompanyService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final PropertyCompanyRepository propertyCompanyRepository;
  private final VillageRepository villageRepository;

  public PropertyCompanyServiceImpl(PropertyCompanyRepository propertyCompanyRepository,
                                    VillageRepository villageRepository) {
    this.propertyCompanyRepository = propertyCompanyRepository;
    this.villageRepository = villageRepository;
  }


  @Override
  public void delete(Long id) {
    this.propertyCompanyRepository.deleteById(id);
    this.updateAllPropertyCompanyRanks();
  }

  @Override
  public PropertyCompany getById(Long id) {
    return this.propertyCompanyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关物业公司"));
  }

  @Override
  public Page<PropertyCompany> page(String name, @NotNull Pageable pageable) {
    // 设置空字符，否则仓库层查询null为参数会报错
    if (name == null) {
      name = "";
    }
    return this.propertyCompanyRepository.findAllByNameContainingAndDeletedIsFalse(name, pageable);
  }

  @Override
  public PropertyCompany save(PropertyCompany propertyCompany) {
    PropertyCompany newPropertyCompany = new PropertyCompany();

    logger.debug("首先调用validateField方法判断是否字段合规");
    this.validateField(propertyCompany);

    this.setData(propertyCompany, newPropertyCompany);
    PropertyCompany returnPropertyCompany = this.propertyCompanyRepository.save(newPropertyCompany);

    logger.debug("设置排名");
    this.updateAllPropertyCompanyRanks();

    logger.debug("更新负责小区");
    for (Village village : newPropertyCompany.getVillages()) {
      village.setPropertyCompany(newPropertyCompany);
      villageRepository.save(village);
    }

    return returnPropertyCompany;
  }

  @Override
  public void setData(PropertyCompany propertyCompany, PropertyCompany newPropertyCompany) {
    newPropertyCompany.setAddress(propertyCompany.getAddress());
    newPropertyCompany.setLegalPerson(propertyCompany.getLegalPerson());
    newPropertyCompany.setAlternateContact(propertyCompany.getAlternateContact());
    newPropertyCompany.setContacts(propertyCompany.getContacts());
    newPropertyCompany.setName(propertyCompany.getName());
    newPropertyCompany.setAlternatePhone(propertyCompany.getAlternatePhone());
    newPropertyCompany.setPhone(propertyCompany.getPhone());
    newPropertyCompany.setScore(propertyCompany.getScore());
    newPropertyCompany.setTimelyResponseRate(propertyCompany.getTimelyResponseRate());
    newPropertyCompany.setVillages(propertyCompany.getVillages());
  }

  @Override
  public void updateAllPropertyCompanyRanks() {
    // 获取所有实体 并加入传入的propertyCompany
    List<PropertyCompany> propertyCompanyOfAll = (List<PropertyCompany>) this.propertyCompanyRepository.findAll();
    // Comparator.comparing默认是升序排序，用reverseOrder改成降序
    propertyCompanyOfAll.sort(Comparator.comparing(PropertyCompany::getScore, Comparator.reverseOrder()));

    // 如果深度删除最后一个实体 实体为空 直接返回
    if (propertyCompanyOfAll.isEmpty()) {
      return;
    }
    Integer temp = propertyCompanyOfAll.get(0).getScore();

    // 当分数与上一个相同时 排名设为rank,此时的rank不变，仍为上一个的rank
    // 当分数与上一个不相同时 排名设为actualRank
    // 例如 有两个分数实体相同，排名都为第一，此时设置当前actualRank为3,第三名
    int rank = 1;
    int actualRank = 1;
    // 为所有实体设置排名
    for (PropertyCompany propertyCompany : propertyCompanyOfAll) {
      // 分数不同则设置实际排名 相同则排名不变
      if (!temp.equals(propertyCompany.getScore())) {
        rank = actualRank;
      }
      propertyCompany.setScoreRank(rank);
      this.propertyCompanyRepository.save(propertyCompany);
      temp = propertyCompany.getScore();
      actualRank++;
    }
  }

  @Override
  public PropertyCompany update(Long id, PropertyCompany propertyCompany) {
    PropertyCompany newPropertyCompany = getById(id);
    newPropertyCompany.setCreateTime(propertyCompany.getCreateTime());
    this.setData(propertyCompany, newPropertyCompany);

    this.validateField(propertyCompany);
    this.propertyCompanyRepository.save(newPropertyCompany);

    logger.debug("设置排名");
    this.updateAllPropertyCompanyRanks();

    logger.debug("更新负责小区");
    List<Village> villages = villageRepository.findAllByPropertyCompany(newPropertyCompany);
    for (Village village : villages) {
      if (newPropertyCompany.getVillages().contains(village)) {
        //如果新小区数组包括原小区直接保存
        villageRepository.save(village);
      } else {
        //如果新小区数组不包括原小区，将原小区物业更新为null
        village.setPropertyCompany(null);
        villageRepository.save(village);
      }
    }

    for (Village village : newPropertyCompany.getVillages()) {
      //更新新小区
      village.setPropertyCompany(newPropertyCompany);
      villageRepository.save(village);
    }

    return newPropertyCompany;
  }

  @Override
  public void validateField(PropertyCompany propertyCompany) {
    Assert.notNull(propertyCompany.getContacts(), "对应联系人不能为空");
    Assert.notNull(propertyCompany.getLegalPerson(), "法人不能为空");
    Assert.notNull(propertyCompany.getPhone(), "联系电话不能为空");
    Assert.notNull(propertyCompany.getName(), "物业公司名称不能为空");
    Assert.notNull(propertyCompany.getScore(), "综合评分不能为空");
    Assert.notNull(propertyCompany.getTimelyResponseRate(), "及时响应率不能为空");
  }
}
